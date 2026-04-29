import './styles.css'

const baseUrl = import.meta.env.BASE_URL

const assetUrl = (path: string): string => `${baseUrl}assets/run14/${path}`

type StoryboardItem = {
  id: string
  title: string
  summary: string
  board: string
}

type VideoItem = {
  id: string
  title: string
  summary: string
  video: string
}

const metrics = [
  { label: '时长', value: '20 秒' },
  { label: '镜头', value: '2 个' },
  { label: '主角', value: '1 位' },
  { label: '场景', value: '1 个' },
]

const storyboardItems: StoryboardItem[] = [
  {
    id: '镜头一',
    title: '危险挑战现场',
    summary: '少女置身昏暗压迫的挑战现场，紧张、恐惧，但依然保持清醒与坚定。',
    board: assetUrl('storyboards/shot_001_board.png'),
  },
  {
    id: '镜头二',
    title: '能力觉醒瞬间',
    summary: '光芒从体内爆发，危险被驱散，少女从惊惧转向兴奋，新的冒险由此展开。',
    board: assetUrl('storyboards/shot_002_board.png'),
  },
]

const shotVideos: VideoItem[] = [
  {
    id: '镜头一视频',
    title: '挑战现场建立镜头',
    summary: '以环境和人物状态为主，完成气氛建立。',
    video: assetUrl('shots/shot_001.mp4'),
  },
  {
    id: '镜头二视频',
    title: '觉醒与反转镜头',
    summary: '以能力激活为核心，完成情绪和光效变化。',
    video: assetUrl('shots/shot_002.mp4'),
  },
]

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App root not found')
}

app.innerHTML = `
  <div class="page-shell">
    <header class="hero">
      <div class="hero-copy">
        <span class="eyebrow">漫剧创作案例 · Run14</span>
        <h1>天才少女的能力觉醒</h1>
        <p class="lede">
          一个 20 秒的动漫短片案例展示页，聚焦四个部分：
          剧本、分镜图、分镜视频、最终视频。
        </p>
        <div class="quick-nav">
          <a href="#script">剧本</a>
          <a href="#boards">分镜图</a>
          <a href="#shots">分镜视频</a>
          <a href="#final-video">最终视频</a>
        </div>
      </div>
      <div class="hero-metrics">
        <ul class="metric-ribbon">
            ${metrics
              .map(
                (metric) => `
                  <li>
                    <strong>${metric.value}</strong>
                    <span>${metric.label}</span>
                  </li>
                `,
              )
              .join('')}
        </ul>
        <p class="hero-brief">原始输入：帮我做一个 20 秒的动漫短片，讲一个天才少女第一次觉醒能力。</p>
      </div>
    </header>

    <main class="content">
      <section class="section" id="script">
        <div class="section-heading">
          <span class="eyebrow">剧本</span>
          <h2>从一句目标到两段短片内容。</h2>
        </div>
        <div class="script-grid">
          <div class="text-card text-card-compact">
            <span class="card-label">原始目标</span>
            <p>帮我做一个 20 秒的动漫短片，讲一个天才少女第一次觉醒能力。</p>
          </div>
          <div class="text-card">
            <span class="card-label">剧情内容</span>
            <p>
              昏暗的挑战现场里，年轻的天才少女第一次面对真正危险的局面。
              她紧张、害怕，身体微微颤抖，却仍然没有退缩。
            </p>
            <p>
              当巨大压力逼近，她体内的力量突然觉醒。光芒从身体中爆发，
              照亮了整个现场，也驱散了原本的危机。她意识到，新的冒险才刚刚开始。
            </p>
          </div>
        </div>
      </section>

      <section class="section" id="boards">
        <div class="section-heading">
          <span class="eyebrow">分镜图</span>
          <h2>两个镜头，对应完整的情绪推进。</h2>
        </div>
        <div class="board-grid">
          ${storyboardItems
            .map(
              (item) => `
                <article class="media-card">
                  <img src="${item.board}" alt="${item.id}" />
                  <div class="media-copy">
                    <span class="card-label">${item.id}</span>
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                  </div>
                </article>
              `,
            )
            .join('')}
        </div>
      </section>

      <section class="section" id="shots">
        <div class="section-heading">
          <span class="eyebrow">分镜视频</span>
          <h2>每个镜头都单独生成，再拼接成最终成片。</h2>
        </div>
        <div class="video-grid">
          ${shotVideos
            .map(
              (item) => `
                <article class="media-card">
                  <video controls playsinline preload="metadata">
                    <source src="${item.video}" type="video/mp4" />
                  </video>
                  <div class="media-copy">
                    <span class="card-label">${item.id}</span>
                    <h3>${item.title}</h3>
                    <p>${item.summary}</p>
                  </div>
                </article>
              `,
            )
            .join('')}
        </div>
      </section>

      <section class="section" id="final-video">
        <div class="section-heading">
          <span class="eyebrow">最终视频</span>
          <h2>完整成片。</h2>
        </div>
        <div class="final-video-card">
          <video controls playsinline preload="metadata" poster="${assetUrl('storyboards/shot_002_first_frame.png')}">
            <source src="${assetUrl('final/final_video.mp4')}" type="video/mp4" />
          </video>
          <div class="final-note">
            <span class="card-label">Run14</span>
            <p>由两个分镜视频剪辑拼接而成的 20 秒成片。</p>
          </div>
        </div>
      </section>
    </main>
  </div>
`
