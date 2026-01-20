import './App.css'

const CONTENT = {
  title: 'Smart Security Camera',
  subtitle: 'Hệ thống giám sát thông minh',
  intro:
    'Trong kỷ nguyên số hóa và đô thị hóa nhanh chóng, nhu cầu an ninh ngày càng tăng. Camera truyền thống chỉ ghi hình thụ động, chưa đủ để phát hiện và ngăn chặn sự cố. Giải pháp mới là camera giám sát thông minh ứng dụng AI và Computer Vision, có khả năng phân tích video, nhận diện đối tượng, phát hiện hành vi bất thường và cảnh báo theo thời gian thực.',
  goals: [
    'Xây dựng hệ thống camera an ninh thông minh phân tích hình ảnh/video theo thời gian thực.',
    'Ứng dụng mô hình AI (YOLO, EfficientNet, MobileNet) để phát hiện người, chuyển động bất thường hoặc xâm nhập.',
    'Cung cấp cảnh báo tức thời qua giao diện hoặc thiết bị di động.',
    'Thiết kế pipeline xử lý video và giao diện hiển thị cảnh báo.',
    'Kiểm thử và đánh giá hiệu suất hệ thống.',
  ],
  scope: [
    'Tập trung vào phát hiện người và chuyển động bất thường.',
    'Thử nghiệm trên video và camera IP nội bộ.',
    'Không tích hợp IoT phức tạp như khóa điện tử hay cửa tự động.',
  ],
  methods: [
    'Nghiên cứu tài liệu về AI, CNN, Object Detection.',
    'Phân tích – thiết kế hệ thống (use case, sơ đồ dữ liệu, kiến trúc).',
    'Huấn luyện/fine-tune mô hình AI trên dataset phù hợp.',
    'Kiểm thử thực tế và đánh giá hiệu suất (độ chính xác, FPS, độ trễ cảnh báo).',
  ],
  expectedResults: [
    'Hệ thống camera thông minh hoàn chỉnh, phát hiện người/xâm nhập theo thời gian thực.',
    'Giao diện hiển thị video và cảnh báo.',
    'Báo cáo chi tiết về độ chính xác và hiệu suất mô hình.',
  ],
  significance: {
    science: 'Đóng góp kinh nghiệm ứng dụng AI và Computer Vision trong giám sát.',
    practice:
      'Nâng cao an toàn cho gia đình, cửa hàng, công ty với chi phí thấp; tiềm năng mở rộng thành sản phẩm thương mại.',
  },
  thesisContent: [
    'Chương 1: Tổng quan hệ thống',
    'Chương 2: Phân tích và thiết kế hệ thống',
    'Chương 3: Triển khai và đánh giá kết quả',
  ],
}

function MiniPieChart({ title, subtitle, items }) {
  const size = 220
  const cx = size / 2
  const cy = size / 2
  const r = 84
  const stroke = 22
  const total = items.reduce((acc, it) => acc + it.value, 0) || 1

  // Start at top (12 o'clock)
  let startAngle = -Math.PI / 2
  const colors = ['#34d399', '#60a5fa', '#a78bfa', '#f59e0b', '#f87171']

  const makeArc = (angleA, angleB) => {
    const x1 = cx + r * Math.cos(angleA)
    const y1 = cy + r * Math.sin(angleA)
    const x2 = cx + r * Math.cos(angleB)
    const y2 = cy + r * Math.sin(angleB)
    const largeArc = angleB - angleA > Math.PI ? 1 : 0
    return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`
  }

  return (
    <div className="card">
      <div>
        <h3 style={{ margin: 0 }}>{title}</h3>
        {subtitle ? <p style={{ margin: '6px 0 0', color: 'var(--muted)' }}>{subtitle}</p> : null}
      </div>

      <div style={{ marginTop: 12, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, alignItems: 'center' }}>
        <svg width={size} height={size} role="img" aria-label={title} style={{ maxWidth: '100%' }}>
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(10,18,33,0.10)" strokeWidth={stroke} />

          {items.map((it, idx) => {
            const frac = it.value / total
            const endAngle = startAngle + frac * Math.PI * 2
            const d = makeArc(startAngle, endAngle)
            const color = colors[idx % colors.length]
            startAngle = endAngle
            return (
              <path
                key={it.label}
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="butt"
              />
            )
          })}

          <text x={cx} y={cy - 2} textAnchor="middle" fontSize="13" fill="rgba(10,18,33,0.66)">
            Tổng
          </text>
          <text x={cx} y={cy + 18} textAnchor="middle" fontSize="20" fontWeight="800" fill="rgba(10,18,33,0.86)">
            {total}
          </text>
        </svg>

        <div>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)' }}>
            {items.map((it, idx) => {
              const color = colors[idx % colors.length]
              const pct = Math.round((it.value / total) * 100)
              return (
                <li key={it.label} style={{ margin: '8px 0' }}>
                  <span
                    aria-hidden="true"
                    style={{
                      display: 'inline-block',
                      width: 10,
                      height: 10,
                      borderRadius: 4,
                      background: color,
                      marginRight: 8,
                      verticalAlign: 'middle',
                    }}
                  />
                  <strong style={{ color: 'rgba(10,18,33,0.86)' }}>{it.label}</strong>:{' '}
                  {it.display ?? it.value} <span style={{ color: 'var(--muted)' }}>({pct}%)</span>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Section({ id, title, hint, children }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <div className="sectionHeader">
        <h2 className="sectionTitle" id={`${id}-title`}>
          {title}
        </h2>
        {hint ? <p className="sectionHint">{hint}</p> : null}
      </div>
      {children}
    </section>
  )
}

export default function App() {
  return (
    <>
      <a className="skipLink" href="#noi-dung">
        Bỏ qua điều hướng → Nội dung
      </a>

      <header className="topbar">
        <div className="container topbarInner">
          <div className="brand" aria-label="Smart Security Camera">
            <span className="brandMark" aria-hidden="true" />
            <span>
              {CONTENT.title} <span style={{ color: 'rgba(255,255,255,0.55)' }}>·</span>{' '}
              {CONTENT.subtitle}
            </span>
          </div>

          <nav className="nav" aria-label="Điều hướng">
            <a href="#gioi-thieu">Giới thiệu</a>
            <a href="#muc-tieu">Mục tiêu</a>
            <a href="#pham-vi">Phạm vi</a>
            <a href="#phuong-phap">Phương pháp</a>
            <a href="#ket-qua">Kết quả</a>
            <a href="#y-nghia">Ý nghĩa</a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container heroGrid">
          <div className="heroCard">
            <div className="eyebrow">🎥 AI · Computer Vision · Cảnh báo thời gian thực</div>
            <h1 className="title">
              {CONTENT.title} <br />
              <span style={{ color: 'rgba(10,18,33,0.72)' }}>{CONTENT.subtitle}</span>
            </h1>
            <p className="subtitle">{CONTENT.intro}</p>

            <div className="ctaRow">
              <a className="btn btnPrimary" href="#muc-tieu">
                Xem mục tiêu
              </a>
              <a className="btn" href="#phuong-phap">
                Xem phương pháp
              </a>
            </div>
          </div>

          <aside className="asideCard" aria-label="Tóm tắt nhanh">
            <div style={{ fontWeight: 800, letterSpacing: '-0.2px' }}>Tóm tắt nhanh</div>
            <p style={{ margin: '8px 0 0', color: 'var(--muted)' }}>
              Trọng tâm: phát hiện người/xâm nhập và chuyển động bất thường, vận hành trên video hoặc
              camera IP nội bộ.
            </p>

            <div className="metricGrid" role="list">
              <div className="metric" role="listitem">
                <div className="metricLabel">Mô hình</div>
                <div className="metricValue">YOLO · EfficientNet · MobileNet</div>
              </div>
              <div className="metric" role="listitem">
                <div className="metricLabel">Tín hiệu đánh giá</div>
                <div className="metricValue">Accuracy · FPS · Latency</div>
              </div>
              <div className="metric" role="listitem">
                <div className="metricLabel">Luồng xử lý</div>
                <div className="metricValue">Video → AI → Cảnh báo</div>
              </div>
              <div className="metric" role="listitem">
                <div className="metricLabel">Kết quả</div>
                <div className="metricValue">UI video + cảnh báo</div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <main className="container" id="main">
        <Section id="gioi-thieu" title="🌐 Giới thiệu" hint="Bối cảnh & nhu cầu">
          <div className="card">
            <p>{CONTENT.intro}</p>
          </div>
        </Section>

        <Section id="muc-tieu" title="🎯 Mục tiêu" hint="Những gì hệ thống hướng tới">
          <div className="card">
            <ul className="list">
              {CONTENT.goals.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="pham-vi" title="🔍 Phạm vi nghiên cứu" hint="Giới hạn & trọng tâm">
          <div className="card">
            <ul className="list">
              {CONTENT.scope.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="phuong-phap" title="🛠️ Phương pháp" hint="Cách tiếp cận triển khai">
          <div className="card">
            <ul className="list">
              {CONTENT.methods.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </Section>

        <Section id="ket-qua" title="📈 Kết quả dự kiến" hint="Deliverables mong đợi">
          <div style={{ marginBottom: 16 }}>
            <MiniPieChart
              title="Biểu đồ đánh giá hiệu suất"
              subtitle="Phân bổ trọng số các chỉ số khi tổng hợp đánh giá (có thể thay bằng số liệu thật)."
              items={[
                { label: 'Accuracy', value: 55, display: 'Ưu tiên' },
                { label: 'FPS', value: 25, display: 'Tốc độ' },
                { label: 'Latency', value: 20, display: 'Độ trễ' },
              ]}
            />
          </div>
          <div className="cardGrid">
            {CONTENT.expectedResults.map((t) => (
              <article className="card" key={t}>
                <h3>{t.split(',')[0]}</h3>
                <p>{t}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="y-nghia" title="💡 Ý nghĩa" hint="Giá trị khoa học & thực tiễn">
          <div className="cardGrid">
            <article className="card">
              <h3>Khoa học</h3>
              <p>{CONTENT.significance.science}</p>
            </article>
            <article className="card">
              <h3>Thực tiễn</h3>
              <p>{CONTENT.significance.practice}</p>
            </article>
          </div>
        </Section>

      </main>

      <footer className="footer">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ marginTop: 6 }}>
              Đơn vị: Khoa Kỹ thuật máy tính và Điện tử, Trường Đại học Công nghệ Thông tin & Truyền thông Việt - Hàn (VKU).
              </div>
              <div style={{ marginTop: 6 }}>
                Giáo Viên Hướng Dẫn: ThS.Nguyễn Thị Huyền
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
