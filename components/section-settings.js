'use client'

import { Sun, Globe } from 'lucide-react'
import { Switch } from './ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function SettingsSection() {
  return (
    <div className="max-w-[var(--max-width-content)] mx-auto">
      <div className="flex items-center justify-between bg-background px-4 py-2 border-b">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch id="notifications" />
            <label htmlFor="notifications" className="text-sm">
              Enable Notifications
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="geolocation" />
            <label htmlFor="geolocation" className="text-sm">
              Enable Geolocation
            </label>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Select defaultValue="system">
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <Select defaultValue="europe">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Edition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="europe">Europe Edition</SelectItem>
                <SelectItem value="us">US Edition</SelectItem>
                <SelectItem value="asia">Asia Edition</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

