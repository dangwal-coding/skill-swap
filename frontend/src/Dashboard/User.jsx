import React, { useEffect, useState } from 'react'
import './User.css'

const placeholder = {
  name: 'Anonymous',
  email: 'no-reply@example.com',
  location: 'Unknown',
  bio: 'This user has not set a bio yet',
  // fallback to a local placeholder so avatar always displays (no external DNS required)
  photo: '/user-placeholder.svg',
}

function buildPhotoUrl(photo) {
  if (!photo) return placeholder.photo
  // normalize backslashes to forward slashes (handles Windows paths)
  const cleaned = String(photo).replace(/\\+/g, '/')
  // if it's a full URL, use as-is
  if (cleaned.startsWith('http')) return cleaned

  // determine backend API host (Vite env or fallback)
  const API_HOST = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_URL)
    ? import.meta.env.VITE_API_URL
    : 'http://localhost:8080'

  // extract filename and return an uploads URL on the backend
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
      const profile = parsed && (parsed.profile || parsed.userProfile || parsed.profileData) || {}
      return {
        name: (parsed && (parsed.name || parsed.fullName || parsed.username)) || profile.name || placeholder.name,
        email: (parsed && (parsed.email)) || profile.email || placeholder.email,
        location: (profile.state && profile.country) ? `${profile.state}, ${profile.country}` : (parsed && (parsed.location || parsed.city)) || placeholder.location,
        bio: (profile.professionalBio) || (parsed && (parsed.bio || parsed.about)) || placeholder.bio,
        photo: buildPhotoUrl((parsed && parsed.photo) || profile.photo),
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
      try {
        const token = localStorage.getItem('token') || localStorage.getItem('authToken') || null
        const headers = { 'Accept': 'application/json' }
        if (token) headers['Authorization'] = `Bearer ${token}`

        const res = await fetch(`${API_HOST.replace(/\/$/, '')}/userprofiles`, { headers })
        if (!res.ok) return
        const data = await res.json()
        // prefer API response but fall back to local parsed if API fields are missing
        if (data) setUser(buildUserFromParsed(data))
      } catch {
        // silent - backend may be offline in development
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
