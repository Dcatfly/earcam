import {
  Monitor,
  Wifi,
  Video,
  Gamepad2,
  RotateCw,
  BatteryMedium,
  Maximize,
  Globe,
  Shield,
  Eye,
  Smartphone,
} from 'lucide-react';

export const languages = ['en', 'zh'] as const;
export type Language = typeof languages[number];

export const defaultLanguage: Language = 'en';

export const translations = {
  en: {
    hero: {
      title: 'Earcam',
      subtitle: 'Bebird Ear Camera TV App',
      description: 'Transform your TV into a professional ear care station - Works with Bebird and other smart ear camera devices',
      tagline: 'View ear health on your TV big screen with HD clarity - The perfect companion for your Bebird ear camera',
      cta: 'Learn More',
      ctaApple: 'App Store',
      ctaAndroid: 'Google Play (Coming Soon)',
      badge: 'Professional Ear Care'
    },
    features: {
      title: 'Key Features',
      subtitle: 'Everything you need for safe ear care',
      items: [
        {
          icon: Monitor,
          title: 'Big Screen Viewing',
          description: 'Transform your TV into a professional ear examination display'
        },
        {
          icon: Wifi,
          title: 'Automatic Connection',
          description: 'Intelligently discovers and connects to devices via local network'
        },
        {
          icon: Video,
          title: 'Real-time HD Video',
          description: 'Watch live HD video feed with minimal latency'
        },
        {
          icon: Gamepad2,
          title: 'TV Remote Control',
          description: 'Navigate easily using your Apple TV remote'
        },
        {
          icon: RotateCw,
          title: 'Video Rotation',
          description: 'Adjust video orientation for optimal viewing'
        },
        {
          icon: BatteryMedium,
          title: 'Battery Monitoring',
          description: 'Track device battery level with visual indicators'
        },
        {
          icon: Maximize,
          title: 'Fullscreen Mode',
          description: 'Immersive fullscreen viewing for detailed examination'
        },
        {
          icon: Globe,
          title: 'Multi-language',
          description: 'Available in English and Chinese'
        }
      ]
    },
    screenshots: {
      title: 'App Screenshots',
      subtitle: 'See Earcam in action',
      home: 'Home Screen',
      cleaning: 'Cleaning Mode',
      fullscreen: 'Fullscreen View',
      rotation: 'Rotation Control'
    },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Simple setup in 4 easy steps',
      steps: [
        {
          number: '01',
          title: 'Connect Device',
          description: 'Connect Apple TV to the WiFi network from your device'
        },
        {
          number: '02',
          title: 'Launch App',
          description: 'Open Earcam on your Apple TV'
        },
        {
          number: '03',
          title: 'Auto Connect',
          description: 'App automatically discovers and connects to your device'
        },
        {
          number: '04',
          title: 'Start Cleaning',
          description: 'View real-time video on your TV screen'
        }
      ]
    },
    compatibility: {
      title: 'Compatible Devices',
      subtitle: 'Works with Bebird and other popular ear camera brands',
      description: 'Supports Bebird smart ear camera devices and other compatible wireless ear cleaning cameras',
      devices: ['Bebird Note3', 'Bebird Note5', 'Bebird Note3 Pro', 'And other compatible models'],
      note: 'If you want to add support for your Bebird or other ear camera device, please contact us.',
      purchaseNote: 'Note: Bebird ear camera devices are sold separately'
    },
    safety: {
      title: 'Safety First',
      subtitle: 'Professional tools for home use',
      items: [
        {
          icon: Shield,
          text: 'Large TV display for safer ear cleaning'
        },
        {
          icon: Eye,
          text: 'Better visibility with HD video streaming'
        },
        {
          icon: Smartphone,
          text: 'Professional tools for home use'
        }
      ]
    },
    contact: {
      title: 'Contact & Support',
      subtitle: 'We\'re here to help',
      description: 'Need help or have questions? Get in touch with us',
      email: 'support@dcatfly.com'
    },
    footer: {
      copyright: '© 2025 Earcam. All rights reserved.'
    }
  },
  zh: {
    hero: {
      title: 'Earcam',
      subtitle: 'Bebird 可视掏耳勺电视版',
      description: '将您的智能电视变成专业的耳道护理站 - Bebird 等智能可视掏耳勺专用应用',
      tagline: '在电视大屏上查看耳道健康状况，画面清晰 - Bebird 可视掏耳勺的完美伴侣',
      cta: '了解更多',
      ctaApple: 'App Store',
      ctaAndroid: 'Google Play (即将可用)',
      badge: '专业耳道护理'
    },
    features: {
      title: '核心功能',
      subtitle: 'Bebird 可视掏耳勺电视版 - 安全耳道护理所需的一切',
      items: [
        {
          icon: Monitor,
          title: '大屏显示',
          description: '将智能电视变成专业的可视掏耳勺显示器'
        },
        {
          icon: Wifi,
          title: '自动连接',
          description: '通过局域网智能发现并连接设备'
        },
        {
          icon: Video,
          title: '实时高清视频',
          description: '以最小延迟观看高清实时视频'
        },
        {
          icon: Gamepad2,
          title: '遥控器控制',
          description: '使用电视遥控器轻松导航操作'
        },
        {
          icon: RotateCw,
          title: '视频旋转',
          description: '调整视频方向获得最佳视角'
        },
        {
          icon: BatteryMedium,
          title: '电量监控',
          description: '通过可视化指示器跟踪设备电量'
        },
        {
          icon: Maximize,
          title: '全屏模式',
          description: '沉浸式全屏观看，便于详细检查'
        },
        {
          icon: Globe,
          title: '多语言支持',
          description: '支持中英文界面'
        }
      ]
    },
    screenshots: {
      title: '应用截图',
      subtitle: '查看 Earcam 实际效果',
      home: '主界面',
      cleaning: '洁耳模式',
      fullscreen: '全屏视图',
      rotation: '旋转控制'
    },
    howItWorks: {
      title: '使用方法',
      subtitle: '简单4步即可开始',
      steps: [
        {
          number: '01',
          title: '连接设备',
          description: '将智能电视连接到设备发出的WiFi中'
        },
        {
          number: '02',
          title: '启动应用',
          description: '在电视上打开 Earcam 应用'
        },
        {
          number: '03',
          title: '自动连接',
          description: '应用自动发现并连接到您的设备'
        },
        {
          number: '04',
          title: '开始洁耳',
          description: '在电视屏幕上查看实时视频'
        }
      ]
    },
    compatibility: {
      title: '兼容设备',
      subtitle: '支持 Bebird 等主流可视掏耳勺品牌',
      description: '支持 Bebird 智能可视掏耳勺设备及其他兼容的无线可视掏耳勺',
      devices: ['Bebird Note3 可视掏耳勺', 'Bebird Note5 可视掏耳勺', 'Bebird Note3 Pro', '其他兼容型号'],
      note: '如果您想添加对您的 Bebird 或其他可视掏耳勺设备的支持，请联系我们。',
      purchaseNote: '注意：Bebird 可视掏耳勺设备需单独购买'
    },
    safety: {
      title: '安全第一',
      subtitle: 'Bebird 可视掏耳勺电视版 - 家用专业工具',
      items: [
        {
          icon: Shield,
          text: '电视大屏显示让可视掏耳勺使用更安全'
        },
        {
          icon: Eye,
          text: '高清视频流提供更好的耳道可视性'
        },
        {
          icon: Smartphone,
          text: '专业可视掏耳勺工具，家用便捷'
        }
      ]
    },
    contact: {
      title: '联系与支持',
      subtitle: '我们随时为您服务',
      description: '需要帮助或有疑问？请联系我们',
      email: 'support@dcatfly.com'
    },
    footer: {
      copyright: '© 2025 Earcam. 保留所有权利。'
    }
  }
} as const;

export function getTranslation(lang: Language) {
  return translations[lang] || translations[defaultLanguage];
}

export function isValidLanguage(lang: string): lang is Language {
  return languages.includes(lang as Language);
}