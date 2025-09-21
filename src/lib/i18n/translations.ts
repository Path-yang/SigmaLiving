export interface Translations {
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    edit: string;
    delete: string;
    close: string;
    back: string;
    next: string;
    previous: string;
    search: string;
    filter: string;
    sort: string;
    refresh: string;
    retry: string;
    learnMore: string;
  };

  // Navigation
  navigation: {
    home: string;
    assistant: string;
    hobbies: string;
    feed: string;
    profile: string;
  };

  // Header
  header: {
    title: string;
    textSize: string;
    language: string;
  };

  // Home Page
  home: {
    title: string;
    subtitle: string;
    features: {
      ai: {
        title: string;
        description: string;
        actionButton: string;
      };
      hobbies: {
        title: string;
        description: string;
        actionButton: string;
      };
      feed: {
        title: string;
        description: string;
        actionButton: string;
      };
    };
  };

  // Assistant Page
  assistant: {
    title: string;
    startVoiceChat: string;
    startTextChat: string;
    stopChat: string;
    avatarConfig: {
      title: string;
      knowledgeBaseId: string;
      avatarId: string;
      language: string;
      quality: string;
      voiceChatTransport: string;
      showMore: string;
      showLess: string;
      voiceSettings: string;
      sttSettings: string;
      rate: string;
      emotion: string;
      model: string;
      provider: string;
    };
  };

  // Profile Page
  profile: {
    title: string;
    subtitle: string;
    editProfile: string;
    stats: {
      posts: string;
      hobbies: string;
      friends: string;
      events: string;
    };
    recentActivity: {
      title: string;
      description: string;
    };
    settings: {
      title: string;
      description: string;
      notifications: string;
      privacy: string;
      textSize: string;
      language: string;
      adjust: string;
      manage: string;
    };
  };

  // Hobbies Page
  hobbies: {
    title: string;
    subtitle: string;
    categories: string;
    popular: string;
    new: string;
  };

  // Feed Page
  feed: {
    title: string;
    subtitle: string;
    post: string;
    like: string;
    comment: string;
    share: string;
  };

  // Footer
  footer: {
    copyright: string;
  };
}

export const translations: Record<string, Translations> = {
  en: {
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      close: "Close",
      back: "Back",
      next: "Next",
      previous: "Previous",
      search: "Search",
      filter: "Filter",
      sort: "Sort",
      refresh: "Refresh",
      retry: "Retry",
      learnMore: "Learn More",
    },
    navigation: {
      home: "Home",
      assistant: "Assistant",
      hobbies: "Hobbies",
      feed: "Feed",
      profile: "Profile",
    },
    header: {
      title: "SilverSigma",
      textSize: "Text Size",
      language: "Language",
    },
    home: {
      title: "Welcome to SilverSigma",
      subtitle: "A simple, friendly app to chat with your AI companion, learn hobbies, and share moments with family and friends.",
      features: {
        ai: {
          title: "Talk to AI",
          description: "Have meaningful conversations with our friendly AI companion using voice or text. Get help, advice, or just chat whenever you need someone to talk to.",
          actionButton: "Start Chatting",
        },
        hobbies: {
          title: "Learn Hobbies",
          description: "Discover new hobbies and activities to keep you engaged and active. From gardening tips to cooking recipes, explore what interests you most.",
          actionButton: "Explore Hobbies",
        },
        feed: {
          title: "Share Moments",
          description: "Share photos and updates with your family and friends easily. Stay connected with your loved ones and never miss important moments.",
          actionButton: "View Feed",
        },
      },
    },
    assistant: {
      title: "AI Assistant",
      startVoiceChat: "Start Voice Chat",
      startTextChat: "Start Text Chat",
      stopChat: "Stop Chat",
      avatarConfig: {
        title: "Avatar Configuration",
        knowledgeBaseId: "Custom Knowledge Base ID",
        avatarId: "Avatar ID",
        language: "Language",
        quality: "Avatar Quality",
        voiceChatTransport: "Voice Chat Transport",
        showMore: "Show more...",
        showLess: "Show less",
        voiceSettings: "Voice Settings",
        sttSettings: "STT Settings",
        rate: "Rate",
        emotion: "Emotion",
        model: "ElevenLabs Model",
        provider: "Provider",
      },
    },
    profile: {
      title: "My Profile",
      subtitle: "Manage your account and see your activity on SilverSigma.",
      editProfile: "Edit Profile",
      stats: {
        posts: "Posts",
        hobbies: "Hobbies",
        friends: "Friends",
        events: "Events",
      },
      recentActivity: {
        title: "Recent Activity",
        description: "Your latest activities on SilverSigma",
      },
      settings: {
        title: "Account Settings",
        description: "Manage your account preferences and privacy settings",
        notifications: "Notifications",
        privacy: "Privacy",
        textSize: "Text Size",
        language: "Language",
        adjust: "Adjust",
        manage: "Manage",
      },
    },
    hobbies: {
      title: "Hobbies & Activities",
      subtitle: "Discover new hobbies and activities to keep you engaged and active.",
      categories: "Categories",
      popular: "Popular",
      new: "New",
    },
    feed: {
      title: "Community Feed",
      subtitle: "Share photos and updates with your family and friends.",
      post: "Post",
      like: "Like",
      comment: "Comment",
      share: "Share",
    },
    footer: {
      copyright: "© 2024 SilverSigma. Designed with love for seniors in Singapore.",
    },
  },

  ms: {
    common: {
      loading: "Memuat...",
      error: "Ralat",
      success: "Berjaya",
      cancel: "Batal",
      save: "Simpan",
      edit: "Edit",
      delete: "Padam",
      close: "Tutup",
      back: "Kembali",
      next: "Seterusnya",
      previous: "Sebelumnya",
      search: "Cari",
      filter: "Tapis",
      sort: "Susun",
      refresh: "Muat semula",
      retry: "Cuba lagi",
      learnMore: "Ketahui Lebih Lanjut",
    },
    navigation: {
      home: "Utama",
      assistant: "Pembantu",
      hobbies: "Hobi",
      feed: "Suapan",
      profile: "Profil",
    },
    header: {
      title: "SilverSigma",
      textSize: "Saiz Teks",
      language: "Bahasa",
    },
    home: {
      title: "Selamat Datang ke SilverSigma",
      subtitle: "Aplikasi yang mudah dan mesra untuk berbual dengan pembantu AI anda, belajar hobi, dan berkongsi detik-detik dengan keluarga dan rakan-rakan.",
      features: {
        ai: {
          title: "Bercakap dengan AI",
          description: "Berbual bermakna dengan pembantu AI mesra kami menggunakan suara atau teks. Dapatkan bantuan, nasihat, atau hanya berbual bila-bila masa anda perlukan seseorang untuk bercakap.",
          actionButton: "Mula Sembang",
        },
        hobbies: {
          title: "Belajar Hobi",
          description: "Temui hobi dan aktiviti baru untuk kekal terlibat dan aktif. Dari petua berkebun hingga resipi memasak, terokai apa yang menarik minat anda.",
          actionButton: "Terokai Hobi",
        },
        feed: {
          title: "Kongsi Detik",
          description: "Kongsi foto dan kemas kini dengan keluarga dan rakan-rakan anda dengan mudah. Terus berhubung dengan orang tersayang dan jangan terlepas detik-detik penting.",
          actionButton: "Lihat Suapan",
        },
      },
    },
    assistant: {
      title: "Pembantu AI",
      startVoiceChat: "Mula Sembang Suara",
      startTextChat: "Mula Sembang Teks",
      stopChat: "Hentikan Sembang",
      avatarConfig: {
        title: "Konfigurasi Avatar",
        knowledgeBaseId: "ID Pangkalan Pengetahuan Kustom",
        avatarId: "ID Avatar",
        language: "Bahasa",
        quality: "Kualiti Avatar",
        voiceChatTransport: "Pengangkutan Sembang Suara",
        showMore: "Tunjukkan lebih...",
        showLess: "Tunjukkan kurang",
        voiceSettings: "Tetapan Suara",
        sttSettings: "Tetapan STT",
        rate: "Kadar",
        emotion: "Emosi",
        model: "Model ElevenLabs",
        provider: "Penyedia",
      },
    },
    profile: {
      title: "Profil Saya",
      subtitle: "Urus akaun anda dan lihat aktiviti anda di SilverSigma.",
      editProfile: "Edit Profil",
      stats: {
        posts: "Catatan",
        hobbies: "Hobi",
        friends: "Rakan",
        events: "Acara",
      },
      recentActivity: {
        title: "Aktiviti Terkini",
        description: "Aktiviti terbaru anda di SilverSigma",
      },
      settings: {
        title: "Tetapan Akaun",
        description: "Urus keutamaan akaun dan tetapan privasi anda",
        notifications: "Notifikasi",
        privacy: "Privasi",
        textSize: "Saiz Teks",
        language: "Bahasa",
        adjust: "Laraskan",
        manage: "Urus",
      },
    },
    hobbies: {
      title: "Hobi & Aktiviti",
      subtitle: "Temui hobi dan aktiviti baru untuk kekal terlibat dan aktif.",
      categories: "Kategori",
      popular: "Popular",
      new: "Baru",
    },
    feed: {
      title: "Suapan Komuniti",
      subtitle: "Kongsi foto dan kemas kini dengan keluarga dan rakan-rakan anda.",
      post: "Catatan",
      like: "Suka",
      comment: "Komen",
      share: "Kongsi",
    },
    footer: {
      copyright: "© 2024 SilverSigma. Direka dengan kasih sayang untuk warga emas di Singapura.",
    },
  },

  ta: {
    common: {
      loading: "ஏற்றுகிறது...",
      error: "பிழை",
      success: "வெற்றி",
      cancel: "ரத்து செய்",
      save: "சேமி",
      edit: "திருத்து",
      delete: "நீக்கு",
      close: "மூடு",
      back: "திரும்பு",
      next: "அடுத்து",
      previous: "முந்தைய",
      search: "தேடு",
      filter: "வடிகட்டு",
      sort: "வரிசைப்படுத்து",
      refresh: "புதுப்பி",
      retry: "மீண்டும் முயற்சி",
      learnMore: "மேலும் அறிய",
    },
    navigation: {
      home: "முகப்பு",
      assistant: "உதவியாளர்",
      hobbies: "விருப்பங்கள்",
      feed: "உணவு",
      profile: "சுயவிவரம்",
    },
    header: {
      title: "SilverSigma",
      textSize: "எழுத்து அளவு",
      language: "மொழி",
    },
    home: {
      title: "SilverSigma-க்கு வரவேற்கிறோம்",
      subtitle: "உங்கள் AI உதவியாளருடன் பேச, விருப்பங்களைக் கற்றுக்கொள்ள, மற்றும் குடும்பம் மற்றும் நண்பர்களுடன் தருணங்களைப் பகிர்ந்துகொள்ள ஒரு எளிமையான, நட்பு பயன்பாடு.",
      features: {
        ai: {
          title: "AI-உடன் பேசுங்கள்",
          description: "குரல் அல்லது உரையைப் பயன்படுத்தி எங்கள் நட்பு AI உதவியாளருடன் அர்த்தமுள்ள உரையாடல்களைக் கொள்ளுங்கள். உதவி, ஆலோசனை, அல்லது பேச ஒருவர் தேவைப்படும்போது பேசுங்கள்.",
          actionButton: "உரையாடலைத் தொடங்குங்கள்",
        },
        hobbies: {
          title: "விருப்பங்களைக் கற்குங்கள்",
          description: "உங்களை ஈடுபடுத்தவும் செயலில் வைக்கவும் புதிய விருப்பங்கள் மற்றும் செயல்பாடுகளைக் கண்டறியுங்கள். தோட்டக்கலை குறிப்புகள் முதல் சமையல் செய்முறைகள் வரை, உங்களை ஆர்வமூட்டும் விஷயங்களை ஆராயுங்கள்.",
          actionButton: "விருப்பங்களை ஆராயுங்கள்",
        },
        feed: {
          title: "தருணங்களைப் பகிர்ந்துகொள்ளுங்கள்",
          description: "உங்கள் குடும்பம் மற்றும் நண்பர்களுடன் புகைப்படங்கள் மற்றும் புதுப்பிப்புகளை எளிதாகப் பகிர்ந்துகொள்ளுங்கள். உங்கள் அன்புக்குரியவர்களுடன் இணைந்திருங்கள் மற்றும் முக்கியமான தருணங்களைத் தவறவிடாதீர்கள்.",
          actionButton: "உணவைப் பார்க்கவும்",
        },
      },
    },
    assistant: {
      title: "AI உதவியாளர்",
      startVoiceChat: "குரல் உரையாடலைத் தொடங்குங்கள்",
      startTextChat: "உரை உரையாடலைத் தொடங்குங்கள்",
      stopChat: "உரையாடலை நிறுத்துங்கள்",
      avatarConfig: {
        title: "அவதார கட்டமைப்பு",
        knowledgeBaseId: "தனிப்பயன் அறிவு தள ID",
        avatarId: "அவதார ID",
        language: "மொழி",
        quality: "அவதார தரம்",
        voiceChatTransport: "குரல் உரையாடல் போக்குவரத்து",
        showMore: "மேலும் காட்டு...",
        showLess: "குறைவாக காட்டு",
        voiceSettings: "குரல் அமைப்புகள்",
        sttSettings: "STT அமைப்புகள்",
        rate: "விகிதம்",
        emotion: "உணர்ச்சி",
        model: "ElevenLabs மாதிரி",
        provider: "வழங்குநர்",
      },
    },
    profile: {
      title: "என் சுயவிவரம்",
      subtitle: "உங்கள் கணக்கை நிர்வகித்து SilverSigma-இல் உங்கள் செயல்பாட்டைப் பாருங்கள்.",
      editProfile: "சுயவிவரத்தைத் திருத்து",
      stats: {
        posts: "இடுகைகள்",
        hobbies: "விருப்பங்கள்",
        friends: "நண்பர்கள்",
        events: "நிகழ்வுகள்",
      },
      recentActivity: {
        title: "சமீபத்திய செயல்பாடு",
        description: "SilverSigma-இல் உங்கள் சமீபத்திய செயல்பாடுகள்",
      },
      settings: {
        title: "கணக்கு அமைப்புகள்",
        description: "உங்கள் கணக்கு விருப்பங்கள் மற்றும் தனியுரிமை அமைப்புகளை நிர்வகியுங்கள்",
        notifications: "அறிவிப்புகள்",
        privacy: "தனியுரிமை",
        textSize: "எழுத்து அளவு",
        language: "மொழி",
        adjust: "சரிசெய்",
        manage: "நிர்வகி",
      },
    },
    hobbies: {
      title: "விருப்பங்கள் & செயல்பாடுகள்",
      subtitle: "உங்களை ஈடுபடுத்தவும் செயலில் வைக்கவும் புதிய விருப்பங்கள் மற்றும் செயல்பாடுகளைக் கண்டறியுங்கள்.",
      categories: "வகைகள்",
      popular: "பிரபலமான",
      new: "புதிய",
    },
    feed: {
      title: "சமூக உணவு",
      subtitle: "உங்கள் குடும்பம் மற்றும் நண்பர்களுடன் புகைப்படங்கள் மற்றும் புதுப்பிப்புகளைப் பகிர்ந்துகொள்ளுங்கள்.",
      post: "இடுகை",
      like: "விரும்பு",
      comment: "கருத்து",
      share: "பகிர்",
    },
    footer: {
      copyright: "© 2024 SilverSigma. சிங்கப்பூரில் மூத்தவர்களுக்காக அன்புடன் வடிவமைக்கப்பட்டது.",
    },
  },

  zh: {
    common: {
      loading: "加载中...",
      error: "错误",
      success: "成功",
      cancel: "取消",
      save: "保存",
      edit: "编辑",
      delete: "删除",
      close: "关闭",
      back: "返回",
      next: "下一步",
      previous: "上一步",
      search: "搜索",
      filter: "筛选",
      sort: "排序",
      refresh: "刷新",
      retry: "重试",
      learnMore: "了解更多",
    },
    navigation: {
      home: "首页",
      assistant: "助手",
      hobbies: "爱好",
      feed: "动态",
      profile: "个人资料",
    },
    header: {
      title: "SilverSigma",
      textSize: "字体大小",
      language: "语言",
    },
    home: {
      title: "欢迎使用SilverSigma",
      subtitle: "一个简单友好的应用程序，可以与您的AI伙伴聊天、学习爱好，并与家人朋友分享美好时光。",
      features: {
        ai: {
          title: "与AI对话",
          description: "使用语音或文字与我们友好的AI伙伴进行有意义的对话。获得帮助、建议，或随时与需要的人聊天。",
          actionButton: "开始聊天",
        },
        hobbies: {
          title: "学习爱好",
          description: "发现新的爱好和活动，让您保持参与和活跃。从园艺技巧到烹饪食谱，探索最感兴趣的内容。",
          actionButton: "探索爱好",
        },
        feed: {
          title: "分享时刻",
          description: "轻松与家人朋友分享照片和更新。与您所爱的人保持联系，不错过重要时刻。",
          actionButton: "查看动态",
        },
      },
    },
    assistant: {
      title: "AI助手",
      startVoiceChat: "开始语音聊天",
      startTextChat: "开始文字聊天",
      stopChat: "停止聊天",
      avatarConfig: {
        title: "头像配置",
        knowledgeBaseId: "自定义知识库ID",
        avatarId: "头像ID",
        language: "语言",
        quality: "头像质量",
        voiceChatTransport: "语音聊天传输",
        showMore: "显示更多...",
        showLess: "显示较少",
        voiceSettings: "语音设置",
        sttSettings: "STT设置",
        rate: "语速",
        emotion: "情感",
        model: "ElevenLabs模型",
        provider: "提供商",
      },
    },
    profile: {
      title: "我的个人资料",
      subtitle: "管理您的账户并查看您在SilverSigma上的活动。",
      editProfile: "编辑个人资料",
      stats: {
        posts: "帖子",
        hobbies: "爱好",
        friends: "朋友",
        events: "活动",
      },
      recentActivity: {
        title: "最近活动",
        description: "您在SilverSigma上的最新活动",
      },
      settings: {
        title: "账户设置",
        description: "管理您的账户偏好和隐私设置",
        notifications: "通知",
        privacy: "隐私",
        textSize: "字体大小",
        language: "语言",
        adjust: "调整",
        manage: "管理",
      },
    },
    hobbies: {
      title: "爱好与活动",
      subtitle: "发现新的爱好和活动，让您保持参与和活跃。",
      categories: "分类",
      popular: "热门",
      new: "最新",
    },
    feed: {
      title: "社区动态",
      subtitle: "与家人朋友分享照片和更新。",
      post: "发布",
      like: "点赞",
      comment: "评论",
      share: "分享",
    },
    footer: {
      copyright: "© 2024 SilverSigma. 专为新加坡老年人设计，充满爱心。",
    },
  },
};
