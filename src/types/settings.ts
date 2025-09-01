export interface ProfileData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  position: string
  bio: string
}

export interface PasswordData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface NotificationSettings {
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  orderUpdates: boolean
  productUpdates: boolean
  systemAlerts: boolean
  marketingEmails: boolean
}

export interface SecuritySettings {
  twoFactorAuth: boolean
  loginAlerts: boolean
  sessionTimeout: number
  passwordExpiry: number
  ipWhitelist: boolean
  allowedIPs: string
}

export interface SystemSettings {
  language: string
  timezone: string
  dateFormat: string
  currency: string
  theme: 'light' | 'dark' | 'auto'
  autoBackup: boolean
  backupFrequency: string
}
