
import { Language } from '../types';

export const translations = {
  en: {
    title: 'VisionPrompt',
    subtitle: 'Analyzer',
    desc: 'Upload an image to reverse-engineer its design DNA and generate professional-grade prompts.',
    badge: 'AI-Powered Visual Intelligence',
    guideBtn: 'Guide',
    steps: {
      1: { title: '1. Upload Reference', desc: 'Upload any image. The AI will analyze composition, lighting, and style.' },
      2: { title: '2. AI Analysis', desc: 'Breaks down the image into "DNA": Subject, Style, Environment, and Objects.' },
      3: { title: '3. Customize DNA', desc: 'Toggle elements in the "DNA Lab". Tweak text fields to refine the prompt.' },
      4: { title: '4. Creative Synthesis', desc: 'Apply Lenses or Styles in "Creative Configuration", then Generate.' }
    },
    dna: {
      subject: { label: 'Subject DNA', desc: 'Primary focus (person, object) and pose.' },
      style: { label: 'Style DNA', desc: 'Artistic medium, lighting, and texture.' },
      env: { label: 'Environment DNA', desc: 'Background, time, weather, and atmosphere.' },
      color: { label: 'Color Mapping', desc: 'Exact hex color palette extracted.' },
      typo: { label: 'Typography', desc: 'Detected text, fonts, and placement.' },
      obj: { label: 'Objects', desc: 'Secondary items and props in the scene.' }
    },
    upload: {
      drop: 'Drop images here (Batch supported)',
      support: 'Support for JPG, PNG, WEBP (Max 10MB)',
      change: 'Add More Images',
      analyze: 'Analyze Queue',
      analyzing: 'Processing Queue...',
      tooltip: 'We support JPG, PNG, and WEBP formats. You can upload multiple files.',
      queueStatus: 'Queue Status'
    },
    history: {
      title: 'Session Gallery',
      empty: 'No history yet',
      pending: 'Pending...',
      processing: 'Analyzing...',
      error: 'Failed'
    },
    result: {
      dnaLab: 'Prompt DNA Lab',
      reset: 'Reset',
      autoSync: 'Auto-Sync',
      subjectPrompt: 'Subject prompt',
      stylePrompt: 'Style prompt',
      envPrompt: 'Environment prompt',
      genPalette: 'Gen with Palette',
      typoMatrix: 'Typography Matrix',
      compDist: 'Component Distribution',
      visualize: 'Visualize Components',
      creativeConfig: 'Creative Configuration',
      filterOverride: 'Artistic Filter Override',
      lensOptic: 'Camera Lens Optic',
      aspectRatio: 'Frame Aspect Ratio',
      negConstraints: 'Negative Constraints',
      masterSynthesis: 'Master Synthesis Prompt',
      copy: 'Copy',
      copied: 'Copied',
      getPrompt: 'Get Prompt',
      imagining: 'Imagining...',
      visualizeResult: 'Visualize Result',
      apply: 'Apply'
    },
    errors: {
      analyze: 'Failed to analyze image. Please ensure your API key is valid and the image is not too large.',
      gen: 'Generation failed.'
    }
  },
  vi: {
    title: 'VisionPrompt',
    subtitle: 'Analyzer',
    desc: 'Tải ảnh lên để phân tích DNA thiết kế và tạo prompt chuyên nghiệp cho tác phẩm tiếp theo của bạn.',
    badge: 'Trí Tuệ Nhân Tạo Hình Ảnh',
    guideBtn: 'Hướng dẫn',
    steps: {
      1: { title: '1. Tải ảnh tham khảo', desc: 'Tải ảnh bất kỳ. AI sẽ phân tích bố cục, ánh sáng và phong cách.' },
      2: { title: '2. Phân tích AI', desc: 'Phân tách ảnh thành các "DNA": Chủ thể, Phong cách, Môi trường, Vật thể.' },
      3: { title: '3. Tùy chỉnh DNA', desc: 'Bật/tắt các yếu tố trong "Phòng Lab DNA". Chỉnh sửa văn bản để tối ưu.' },
      4: { title: '4. Tổng hợp sáng tạo', desc: 'Áp dụng Ống kính hoặc Phong cách mới trong "Cấu hình Sáng tạo", rồi Tạo ảnh.' }
    },
    dna: {
      subject: { label: 'DNA Chủ thể', desc: 'Tiêu điểm chính (người, vật) và tư thế.' },
      style: { label: 'DNA Phong cách', desc: 'Chất liệu nghệ thuật, ánh sáng, kết cấu.' },
      env: { label: 'DNA Môi trường', desc: 'Bối cảnh, thời gian, thời tiết, không khí.' },
      color: { label: 'Bản đồ màu', desc: 'Bảng màu hex trích xuất chính xác.' },
      typo: { label: 'Typography', desc: 'Văn bản, phông chữ và vị trí được phát hiện.' },
      obj: { label: 'Vật thể', desc: 'Các đồ vật phụ và đạo cụ trong cảnh.' }
    },
    upload: {
      drop: 'Thả nhiều ảnh vào đây',
      support: 'Hỗ trợ JPG, PNG, WEBP (Tối đa 10MB)',
      change: 'Thêm ảnh',
      analyze: 'Phân tích hàng đợi',
      analyzing: 'Đang xử lý...',
      tooltip: 'Hỗ trợ định dạng JPG, PNG, WEBP. Có thể chọn nhiều ảnh cùng lúc.',
      queueStatus: 'Trạng thái hàng chờ'
    },
    history: {
      title: 'Thư viện phiên',
      empty: 'Chưa có lịch sử',
      pending: 'Đang chờ...',
      processing: 'Đang phân tích...',
      error: 'Lỗi'
    },
    result: {
      dnaLab: 'Phòng Lab DNA',
      reset: 'Đặt lại',
      autoSync: 'Đồng bộ',
      subjectPrompt: 'Prompt chủ thể',
      stylePrompt: 'Prompt phong cách',
      envPrompt: 'Prompt môi trường',
      genPalette: 'Tạo từ bảng màu',
      typoMatrix: 'Ma trận chữ',
      compDist: 'Phân bố thành phần',
      visualize: 'Trực quan hóa',
      creativeConfig: 'Cấu hình Sáng tạo',
      filterOverride: 'Bộ lọc nghệ thuật',
      lensOptic: 'Ống kính máy ảnh',
      aspectRatio: 'Tỷ lệ khung hình',
      negConstraints: 'Loại trừ (Negative)',
      masterSynthesis: 'Prompt Tổng hợp',
      copy: 'Sao chép',
      copied: 'Đã chép',
      getPrompt: 'Lấy Prompt',
      imagining: 'Đang vẽ...',
      visualizeResult: 'Tạo kết quả',
      apply: 'Dùng'
    },
    errors: {
      analyze: 'Phân tích thất bại. Vui lòng kiểm tra API key và kích thước ảnh.',
      gen: 'Tạo ảnh thất bại.'
    }
  },
  zh: {
    title: 'VisionPrompt',
    subtitle: '分析器',
    desc: '上传图片以逆向工程其设计DNA，并生成专业级的生成式AI提示词。',
    badge: 'AI驱动的视觉智能',
    guideBtn: '指南',
    steps: {
      1: { title: '1. 上传参考图', desc: '上传任何图片。AI将分析构图、光线和风格。' },
      2: { title: '2. AI分析', desc: '将图像分解为“DNA”：主体、风格、环境和物体。' },
      3: { title: '3. 自定义DNA', desc: '在“DNA实验室”中切换元素。调整文本字段以微调提示词。' },
      4: { title: '4. 创意合成', desc: '在“创意配置”中应用新的相机镜头或艺术风格，然后生成。' }
    },
    dna: {
      subject: { label: '主体 DNA', desc: '图像的主要焦点（人、物）及其姿势。' },
      style: { label: '风格 DNA', desc: '艺术媒介、光照和纹理细节。' },
      env: { label: '环境 DNA', desc: '背景设置、一天中的时间、天气和氛围。' },
      color: { label: '色彩映射', desc: '提取的精确十六进制调色板。' },
      typo: { label: '排版', desc: '检测到的文本、字体样式和位置。' },
      obj: { label: '物体', desc: '场景中散落的次要物品和道具。' }
    },
    upload: {
      drop: '在此处拖放多张图片',
      support: '支持 JPG, PNG, WEBP (最大 10MB)',
      change: '添加更多图片',
      analyze: '分析队列',
      analyzing: '正在处理队列...',
      tooltip: '支持最大 10MB 的 JPG, PNG 和 WEBP 格式。支持批量上传。',
      queueStatus: '队列状态'
    },
    history: {
      title: '会话库',
      empty: '暂无历史',
      pending: '等待中...',
      processing: '分析中...',
      error: '失败'
    },
    result: {
      dnaLab: '提示词 DNA 实验室',
      reset: '重置',
      autoSync: '自动同步',
      subjectPrompt: '主体提示词',
      stylePrompt: '风格提示词',
      envPrompt: '环境提示词',
      genPalette: '使用调色板生成',
      typoMatrix: '排版矩阵',
      compDist: '组件分布',
      visualize: '可视化组件',
      creativeConfig: '创意配置',
      filterOverride: '艺术滤镜覆盖',
      lensOptic: '相机镜头光学',
      aspectRatio: '画幅比例',
      negConstraints: '负面约束 (Negative)',
      masterSynthesis: '主合成提示词',
      copy: '复制',
      copied: '已复制',
      getPrompt: '获取提示词',
      imagining: '构想中...',
      visualizeResult: '可视化结果',
      apply: '应用'
    },
    errors: {
      analyze: '分析图片失败。请确保您的 API 密钥有效且图片不要太大。',
      gen: '生成失败。'
    }
  },
  ja: {
    title: 'VisionPrompt',
    subtitle: 'Analyzer',
    desc: '画像をアップロードしてデザインDNAをリバースエンジニアリングし、プロ仕様のプロンプトを生成します。',
    badge: 'AI搭載ビジュアルインテリジェンス',
    guideBtn: 'ガイド',
    steps: {
      1: { title: '1. 参照画像をアップロード', desc: '画像をアップロードします。AIが構図、照明、スタイルを分析します。' },
      2: { title: '2. AI分析', desc: '画像を「DNA」に分解します：主題、スタイル、環境、オブジェクト。' },
      3: { title: '3. DNAのカスタマイズ', desc: '「DNAラボ」で要素を切り替えます。テキストフィールドでプロンプトを微調整します。' },
      4: { title: '4. クリエイティブ合成', desc: '「クリエイティブ設定」で新しいレンズやスタイルを適用し、生成します。' }
    },
    dna: {
      subject: { label: '主題 DNA', desc: '画像の主な焦点（人、物）とそのポーズ。' },
      style: { label: 'スタイル DNA', desc: '芸術的媒体、照明、テクスチャの詳細。' },
      env: { label: '環境 DNA', desc: '背景、時間帯、天候、雰囲気。' },
      color: { label: 'カラーマッピング', desc: '抽出された正確な16進数カラーパレット。' },
      typo: { label: 'タイポグラフィ', desc: '検出されたテキスト、フォント、配置。' },
      obj: { label: 'オブジェクト', desc: 'シーン内の二次的なアイテムや小道具。' }
    },
    upload: {
      drop: 'ここに画像をドロップ (一括対応)',
      support: 'JPG, PNG, WEBP 対応 (最大 10MB)',
      change: '画像を追加',
      analyze: 'キューを分析',
      analyzing: '処理中...',
      tooltip: '最大10MBのJPG、PNG、WEBP形式をサポート。複数ファイルのアップロードが可能です。',
      queueStatus: 'キューステータス'
    },
    history: {
      title: 'セッションギャラリー',
      empty: '履歴なし',
      pending: '待機中...',
      processing: '分析中...',
      error: '失敗'
    },
    result: {
      dnaLab: 'プロンプトDNAラボ',
      reset: 'リセット',
      autoSync: '自動同期',
      subjectPrompt: '主題プロンプト',
      stylePrompt: 'スタイルプロンプト',
      envPrompt: '環境プロンプト',
      genPalette: 'パレットで生成',
      typoMatrix: 'タイポグラフィ行列',
      compDist: 'コンポーネント分布',
      visualize: 'コンポーネントを視覚化',
      creativeConfig: 'クリエイティブ設定',
      filterOverride: 'アートフィルター上書き',
      lensOptic: 'カメラレンズ光学',
      aspectRatio: 'アスペクト比',
      negConstraints: 'ネガティブ制約',
      masterSynthesis: 'マスター合成プロンプト',
      copy: 'コピー',
      copied: 'コピー完了',
      getPrompt: 'プロンプト取得',
      imagining: '生成中...',
      visualizeResult: '結果を視覚化',
      apply: '適用'
    },
    errors: {
      analyze: '画像の分析に失敗しました。APIキーを確認してください。',
      gen: '生成に失敗しました。'
    }
  },
  th: {
    title: 'VisionPrompt',
    subtitle: 'Analyzer',
    desc: 'อัปโหลดรูปภาพเพื่อวิเคราะห์ DNA การออกแบบและสร้าง Prompt ระดับมืออาชีพ',
    badge: 'ระบบอัจฉริยะทางภาพด้วย AI',
    guideBtn: 'คู่มือ',
    steps: {
      1: { title: '1. อัปโหลดรูปอ้างอิง', desc: 'อัปโหลดรูปภาพ AI จะวิเคราะห์องค์ประกอบ แสง และสไตล์' },
      2: { title: '2. วิเคราะห์ AI', desc: 'แยกย่อยรูปภาพเป็น "DNA": ตัวแบบ, สไตล์, สภาพแวดล้อม และวัตถุ' },
      3: { title: '3. ปรับแต่ง DNA', desc: 'เปิด/ปิด องค์ประกอบใน "DNA Lab" ปรับแก้ข้อความเพื่อ Prompt ที่ดีที่สุด' },
      4: { title: '4. สังเคราะห์ผลงาน', desc: 'ใช้เลนส์กล้องหรือสไตล์ศิลปะใหม่ใน "การตั้งค่าสร้างสรรค์" แล้วกดสร้าง' }
    },
    dna: {
      subject: { label: 'DNA ตัวแบบ', desc: 'จุดสนใจหลัก (คน, วัตถุ) และท่าทาง' },
      style: { label: 'DNA สไตล์', desc: 'สื่อทางศิลปะ แสง และพื้นผิว' },
      env: { label: 'DNA สภาพแวดล้อม', desc: 'ฉากหลัง เวลา สภาพอากาศ และบรรยากาศ' },
      color: { label: 'แผนที่สี', desc: 'ชุดสี Hex ที่ดึงออกมาจากภาพ' },
      typo: { label: 'ตัวอักษร', desc: 'ข้อความที่ตรวจพบ ฟอนต์ และตำแหน่ง' },
      obj: { label: 'วัตถุ', desc: 'สิ่งของรองและอุปกรณ์ประกอบฉากในฉาก' }
    },
    upload: {
      drop: 'วางรูปภาพที่นี่ (รองรับหลายไฟล์)',
      support: 'รองรับ JPG, PNG, WEBP (สูงสุด 10MB)',
      change: 'เพิ่มรูปภาพ',
      analyze: 'วิเคราะห์คิว',
      analyzing: 'กำลังประมวลผล...',
      tooltip: 'รองรับไฟล์ JPG, PNG, WEBP อัปโหลดได้หลายรูปพร้อมกัน',
      queueStatus: 'สถานะคิว'
    },
    history: {
      title: 'แกลเลอรี',
      empty: 'ไม่มีประวัติ',
      pending: 'รอ...',
      processing: 'กำลังวิเคราะห์...',
      error: 'ล้มเหลว'
    },
    result: {
      dnaLab: 'ห้องทดลอง DNA',
      reset: 'รีเซ็ต',
      autoSync: 'ซิงค์อัตโนมัติ',
      subjectPrompt: 'Prompt ตัวแบบ',
      stylePrompt: 'Prompt สไตล์',
      envPrompt: 'Prompt สภาพแวดล้อม',
      genPalette: 'สร้างจากชุดสี',
      typoMatrix: 'เมทริกซ์ตัวอักษร',
      compDist: 'การกระจายองค์ประกอบ',
      visualize: 'แสดงภาพองค์ประกอบ',
      creativeConfig: 'การตั้งค่าสร้างสรรค์',
      filterOverride: 'ตัวกรองศิลปะ',
      lensOptic: 'เลนส์กล้อง',
      aspectRatio: 'อัตราส่วนภาพ',
      negConstraints: 'ข้อจำกัด (Negative)',
      masterSynthesis: 'Prompt สังเคราะห์หลัก',
      copy: 'คัดลอก',
      copied: 'คัดลอกแล้ว',
      getPrompt: 'รับ Prompt',
      imagining: 'กำลังจินตนาการ...',
      visualizeResult: 'แสดงผลลัพธ์',
      apply: 'ใช้'
    },
    errors: {
      analyze: 'วิเคราะห์รูปภาพไม่สำเร็จ โปรดตรวจสอบ API Key หรือขนาดไฟล์',
      gen: 'การสร้างล้มเหลว'
    }
  }
};