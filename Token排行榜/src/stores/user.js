import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State - 从 localStorage 恢复
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(JSON.parse(localStorage.getItem('user') || '{}'))
  const profile = ref(JSON.parse(localStorage.getItem('profile') || '{}'))

  // Getters
  const isLoggedIn = computed(() => !!token.value)
  const userInfo = computed(() => ({
    ...user.value,
    ...profile.value
  }))

  // Actions
  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }

  function setUser(userData) {
    user.value = userData
    localStorage.setItem('user', JSON.stringify(userData))
  }

  function setProfile(profileData) {
    profile.value = profileData
    localStorage.setItem('profile', JSON.stringify(profileData))
  }

  function logout() {
    token.value = ''
    user.value = {}
    profile.value = {}
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('profile')
  }

  return {
    token,
    user,
    profile,
    isLoggedIn,
    userInfo,
    setToken,
    setUser,
    setProfile,
    logout
  }
})