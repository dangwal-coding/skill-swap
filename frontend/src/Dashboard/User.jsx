import React, { useEffect, useState } from 'react'
import './User.css'

const placeholder = {
  name: 'Anonymous',
  email: 'no-reply@example.com',
  location: 'Unknown',
  bio: 'This user has not set a bio yet',
  // ensure we always have a local fallback image
  photo: '/user-placeholder.svg',
}

function buildPhotoUrl(photo) {
  if (!photo) return placeholder.photo
  // accept data URLs untouched
  if (typeof photo === 'string' && photo.trim().startsWith('data:')) return photo
  // normalize backslashes to forward slashes (handles Windows paths)
  const cleaned = String(photo).replace(/\\+/g, '/').trim()
  // if it's a full URL, use as-is
  if (cleaned.startsWith('http')) return cleaned

  // determine backend API host (Vite env or fallback)
  const API_HOST = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:8080'

  // absolute path returned by backend (e.g. "/uploads/filename.jpg")
  if (cleaned.startsWith('/')) {
    return `${API_HOST.replace(/\/$/, '')}${cleaned}`
  }

  // if the value already contains 'uploads/...' or is a path, append to host
  if (cleaned.includes('uploads/')) {
    return `${API_HOST.replace(/\/$/, '')}/${cleaned.replace(/^\/+/, '')}`
  }

  // fallback: treat as filename and map to /uploads/<filename>
  const parts = cleaned.split('/')
  const fname = parts[parts.length - 1]
  return `${API_HOST.replace(/\/$/, '')}/uploads/${fname}`
}

function formatJoined(dateStr) {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString()
  } catch {
    return dateStr
  }
}

export default function User() {
  const [user, setUser] = useState(placeholder)

  useEffect(() => {
    // helper to build the UI-friendly user object from any parsed payload
    function buildUserFromParsed(parsed) {
      // also consider parsed.user and parsed.user.profile locations
      const profile = parsed && (parsed.profile || parsed.userProfile || parsed.profileData || parsed.user?.profile) || {}
      // try many common photo locations
      const rawPhoto =
        (parsed && (parsed.photo || parsed.user?.photo)) ||
        profile.photo ||
        null

      // if photo is an object, extract likely string fields
      let photoVal = null
      if (rawPhoto && typeof rawPhoto === 'object') {
        photoVal =
          rawPhoto.url ||
          rawPhoto.path ||
          rawPhoto.filename ||
          rawPhoto.fileName ||
          rawPhoto.src ||
          rawPhoto.image ||
          null
      } else {
        photoVal = rawPhoto
      }

      return {
        name: (parsed && (parsed.name || parsed.fullName || parsed.username)) || profile.name || placeholder.name,
        email: (parsed && (parsed.email)) || profile.email || placeholder.email,
        location: (profile.state && profile.country) ? `${profile.state}, ${profile.country}` : (parsed && (parsed.location || parsed.city)) || placeholder.location,
        bio: (profile.professionalBio) || (parsed && (parsed.bio || parsed.about)) || placeholder.bio,
        photo: buildPhotoUrl(photoVal),
        joined: (profile.createdAt) || (parsed && (parsed.createdAt || parsed.joined || parsed.registeredAt)) || null,
        postsCount: (profile.posts != null) ? profile.posts : null,
        followersCount: (profile.followers != null) ? profile.followers : null,
        followingCount: (profile.following != null) ? profile.following : null,
      }
    }

    // load from localStorage first
    try {
      const raw = localStorage.getItem('user')
      if (raw) {
        const parsed = JSON.parse(raw)
        setUser(buildUserFromParsed(parsed))
      }
    } catch {
      console.warn('Failed to load user from storage')
    }

    // determine backend host
    const API_HOST = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
      ? import.meta.env.VITE_API_URL
      : 'http://localhost:8080'

    // try to fetch authoritative profile from backend
    async function fetchProfileFromApi() {
      // read an explicit configured profile path from env (optional)
      const PROFILE_PATH = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_PROFILE_PATH)
        ? import.meta.env.VITE_PROFILE_PATH
        : null

      // if no explicit profile path configured, avoid guessing endpoints that 404.
      // fallback to localStorage user which is already loaded above.
      if (!PROFILE_PATH) {
        console.debug('VITE_PROFILE_PATH not set — skipping profile fetch and using localStorage fallback')
        return
      }

      try {
        const token = localStorage.getItem('token') || localStorage.getItem('authToken') || null
        const headers = { 'Accept': 'application/json' }
        if (token) headers['Authorization'] = `Bearer ${token}`

        const API_BASE = API_HOST.replace(/\/$/, '')
        const url = PROFILE_PATH.startsWith('http') ? PROFILE_PATH : `${API_BASE}/${PROFILE_PATH.replace(/^\/+/, '')}`

        let res = await fetch(url, { headers })
        if (!res.ok) {
          console.debug('Profile fetch returned non-ok', res.status, url)
          return
        }
        const data = await res.json()
        if (data) setUser(buildUserFromParsed(data))
      } catch (err) {
        console.debug('fetchProfileFromApi failed', err)
      }
    }

    fetchProfileFromApi()

    const onAuth = async () => {
      try {
        const raw = localStorage.getItem('user')
        if (raw) {
          const parsed = JSON.parse(raw)
          setUser(buildUserFromParsed(parsed))
        }
  } catch { console.debug('onAuth parse failed') }
      // also refresh from API when auth changes
      fetchProfileFromApi()
    }

    window.addEventListener('authChanged', onAuth)
    return () => window.removeEventListener('authChanged', onAuth)
  }, [])

  // mock posts grid — keep small and local to avoid backend call
  const posts = [
    '/image.jpg', '/image.jpg', '/image.jpg', '/image.jpg', '/image.jpg', '/image.jpg'
  ]

  return (
    <div className="profile-root">
      <div className="profile-header">
        <div className="profile-top">
          <img
            className="profile-avatar-img"
            src={user.photo}
            alt="avatar"
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholder.photo }}
          />
          <div className="profile-meta">
            <div className="meta-row">
              <h1 className="profile-name">{user.name}</h1>
              <button className="edit-btn" onClick={() => alert('Edit profile - not implemented')}>Edit profile</button>
            </div>
            <div className="meta-stats">
              <div><strong>{user.postsCount != null ? user.postsCount : '-'}</strong> posts</div>
              <div><strong>{user.followersCount != null ? user.followersCount : '-'}</strong> followers</div>
              <div><strong>{user.followingCount != null ? user.followingCount : '-'}</strong> following</div>
            </div>
            <div className="meta-bio">
              <div className="bio-text">{user.bio}</div>
              <div className="bio-extra">{user.location} • Joined {formatJoined(user.joined)}</div>
              <div className="bio-email">{user.email}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-body">
        <div className="tabs">
          <div className="tab active" style={{color:'white'}}>Posts</div>
          <div className="tab" style={{color:'white'}}>Tagged</div>
        </div>

        <div className="posts-grid">
          {posts.map((p, i) => (
            <div key={i} className="post-item">
              <img src={p} alt={`post-${i}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}