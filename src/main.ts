import './styles.css'

const baseUrl = import.meta.env.BASE_URL

const assetUrl = (assetKey: string, path: string): string => `${baseUrl}assets/${assetKey}/${path}`
const caseHref = (slug: string): string => `#/case/${slug}`

type StoryboardShot = {
  id: string
  order: number
  shot_purpose?: string
  subject_action?: string
}

type StoryboardDocument = {
  shots: StoryboardShot[]
}

type ShotCopy = {
  title: string
  summary: string
}

type ShowcaseCase = {
  slug: string
  assetKey: string
  title: string
  cardLabel: string
  hook: string
  synopsis: string
  durationLabel: string
  shotCount: number
  shotCopy: ShotCopy[]
}

const showcaseCases: ShowcaseCase[] = [
  {
    slug: 'chuci-juexing',
    assetKey: 'run14',
    title: '初次觉醒',
    cardLabel: '主案例',
    hook: '天才少女在绝境中第一次唤醒力量。',
    synopsis: '一次危险挑战，成为天才少女第一次能力觉醒的起点。',
    durationLabel: '18.1 秒',
    shotCount: 2,
    shotCopy: [
      {
        title: '危险现场',
        summary: '少女第一次真正直面危险，紧张与坚定同时出现。',
      },
      {
        title: '能力觉醒',
        summary: '体内光芒爆发，危险被驱散，新的冒险由此展开。',
      },
    ],
  },
  {
    slug: 'zhanduan-suming',
    assetKey: 'run23',
    title: '斩断宿命',
    cardLabel: '辅助案例',
    hook: '被选作祭品的少年，握剑反抗既定命运。',
    synopsis: '被选作祭品的少年在宿命祭坛上握紧旧剑，正式迈出反抗命运的第一步。',
    durationLabel: '54.3 秒',
    shotCount: 6,
    shotCopy: [
      {
        title: '宿命祭坛',
        summary: '高空祭坛与翻涌云海共同建立压迫感。',
      },
      {
        title: '沉默束缚',
        summary: '阿尘被丝线捆缚，视线落在父亲留下的旧剑上。',
      },
      {
        title: '被选中的过去',
        summary: '童年回忆揭开他为何会站上祭坛。',
      },
      {
        title: '怒意回潮',
        summary: '闷雷回到现实，死寂被不甘与愤怒取代。',
      },
      {
        title: '立誓破命',
        summary: '他握剑起身，公开宣告要斩断命运枷锁。',
      },
      {
        title: '直面宿命',
        summary: '惩戒力量降下，他抬头迎向真正的对抗。',
      },
    ],
  },
  {
    slug: 'zhongfan-saidian',
    assetKey: 'run4',
    title: '重返赛点',
    cardLabel: '辅助案例',
    hook: '陨落冠军在旧奖杯与旧键盘前决定再上赛场。',
    synopsis: '退役后的电竞天才在旧奖杯与旧键盘之间，重新找回回到赛场的决心。',
    durationLabel: '27.2 秒',
    shotCount: 3,
    shotCopy: [
      {
        title: '低谷时刻',
        summary: '出租屋、旧奖杯与颓废状态共同建立人物处境。',
      },
      {
        title: '巅峰回响',
        summary: '荣耀记忆短暂回到眼前，现实与高光形成对照。',
      },
      {
        title: '重启按键',
        summary: '他按下旧键盘，重新决定回到电竞赛场。',
      },
    ],
  },
]

const caseMap = new Map(showcaseCases.map((item) => [item.slug, item]))
const storyboardCache = new Map<string, Promise<StoryboardDocument>>()
const scriptCache = new Map<string, Promise<string>>()
const inputCache = new Map<string, Promise<string>>()

const app = document.querySelector<HTMLDivElement>('#app')

if (!app) {
  throw new Error('App root not found')
}

const htmlEscape = (value: string): string =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;')

const loadStoryboard = (item: ShowcaseCase): Promise<StoryboardDocument> => {
  const cached = storyboardCache.get(item.assetKey)
  if (cached) {
    return cached
  }

  const request = fetch(assetUrl(item.assetKey, 'metadata/storyboard.json')).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Failed to load storyboard for ${item.assetKey}`)
    }

    return (await response.json()) as StoryboardDocument
  })

  storyboardCache.set(item.assetKey, request)
  return request
}

const loadScript = (item: ShowcaseCase): Promise<string> => {
  const cached = scriptCache.get(item.assetKey)
  if (cached) {
    return cached
  }

  const request = fetch(assetUrl(item.assetKey, 'script/script_clean.txt')).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Failed to load script for ${item.assetKey}`)
    }

    return (await response.text()).trim()
  })

  scriptCache.set(item.assetKey, request)
  return request
}

const loadInput = (item: ShowcaseCase): Promise<string> => {
  const cached = inputCache.get(item.assetKey)
  if (cached) {
    return cached
  }

  const request = fetch(assetUrl(item.assetKey, 'input/source_input.txt')).then(async (response) => {
    if (!response.ok) {
      throw new Error(`Failed to load input for ${item.assetKey}`)
    }

    return (await response.text()).trim()
  })

  inputCache.set(item.assetKey, request)
  return request
}

const updateMeta = (item?: ShowcaseCase): void => {
  const title = item ? `${item.title} · AI 漫剧创作工作流案例集` : 'AI 漫剧创作工作流案例集'
  const description = item
    ? `${item.title}：${item.synopsis}`
    : '中文项目作品集，展示 AI 漫剧创作工作流生成的公开案例，从剧本、分镜到最终成片。'

  document.title = title

  const descriptionMeta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  if (descriptionMeta) {
    descriptionMeta.content = description
  }
}

const renderHome = (): string => {
  const [featuredCase, ...secondaryCases] = showcaseCases

  return `
    <div class="site-shell">
      <header class="home-hero">
        <span class="eyebrow">AI 漫剧创作工作流</span>
        <h1>AI 漫剧创作工作流案例集</h1>
        <p class="hero-lede">展示 AI 漫剧创作工作流生成的完整案例，从剧本、分镜到最终成片。</p>
        <div class="overview-pills">
          <span>3 个公开案例</span>
          <span>多阶段 AI 工作流</span>
          <span>剧本 · 分镜 · 视频 · 成片</span>
        </div>
      </header>

      <main class="home-main">
        <section class="section-intro">
          <span class="section-kicker">精选案例</span>
          <p>首页聚焦作品本身，详情页统一保留剧本、分镜图、分镜视频与最终视频。</p>
        </section>

        <section class="portfolio-layout">
          <a class="case-card featured-card" href="${caseHref(featuredCase.slug)}" aria-label="查看 ${featuredCase.title}">
            <div class="case-card-media">
              <img src="${assetUrl(featuredCase.assetKey, 'cover.jpg')}" alt="${featuredCase.title}" />
            </div>
            <div class="case-card-body">
              <div class="card-topline">
                <span class="case-badge">${featuredCase.cardLabel}</span>
              </div>
              <h3>${featuredCase.title}</h3>
              <p>${featuredCase.hook}</p>
              <div class="case-stats">
                <span>${featuredCase.durationLabel}</span>
                <span>${featuredCase.shotCount} 个镜头</span>
              </div>
            </div>
          </a>

          <div class="secondary-stack">
            ${secondaryCases
              .map(
                (item) => `
                  <a class="case-card secondary-card" href="${caseHref(item.slug)}" aria-label="查看 ${item.title}">
                    <div class="case-card-media">
                      <img src="${assetUrl(item.assetKey, 'cover.jpg')}" alt="${item.title}" />
                    </div>
                    <div class="case-card-body">
                      <div class="card-topline">
                        <span class="case-badge">${item.cardLabel}</span>
                      </div>
                      <h3>${item.title}</h3>
                      <p>${item.hook}</p>
                      <div class="case-stats">
                        <span>${item.durationLabel}</span>
                        <span>${item.shotCount} 个镜头</span>
                      </div>
                    </div>
                  </a>
                `,
              )
              .join('')}
          </div>
        </section>
      </main>
    </div>
  `
}

const renderLoading = (item: ShowcaseCase): string => `
  <div class="site-shell">
    <header class="detail-hero">
      <a class="back-link" href="#/">返回案例集</a>
      <div class="loading-panel">
        <span class="eyebrow">案例详情</span>
        <h1>${item.title}</h1>
        <p>正在加载剧本、分镜图、分镜视频与最终视频。</p>
      </div>
    </header>
  </div>
`

const renderError = (item: ShowcaseCase): string => `
  <div class="site-shell">
    <header class="detail-hero">
      <a class="back-link" href="#/">返回案例集</a>
      <div class="loading-panel">
        <span class="eyebrow">加载失败</span>
        <h1>${item.title}</h1>
        <p>当前案例资源未能完整读取，请稍后重试。</p>
      </div>
    </header>
  </div>
`

const renderCaseDetail = (
  item: ShowcaseCase,
  inputText: string,
  script: string,
  storyboard: StoryboardDocument,
): string => {
  const orderedShots = [...storyboard.shots].sort((left, right) => left.order - right.order)

  return `
    <div class="site-shell">
      <header class="detail-hero">
        <a class="back-link" href="#/">返回案例集</a>

        <div class="detail-grid">
          <div class="detail-copy">
            <span class="eyebrow">案例详情</span>
            <h1>${item.title}</h1>
            <p class="detail-lede">${item.synopsis}</p>
            <div class="detail-pills">
              <span>${item.durationLabel}</span>
              <span>${item.shotCount} 个镜头</span>
              <span>完整公开案例</span>
            </div>
            <div class="detail-nav">
              <button type="button" data-scroll-target="section-input">输入</button>
              <button type="button" data-scroll-target="section-script">剧本</button>
              <button type="button" data-scroll-target="section-boards">分镜图</button>
              <button type="button" data-scroll-target="section-shots">分镜视频</button>
              <button type="button" data-scroll-target="section-final">最终视频</button>
            </div>
          </div>

          <div class="detail-cover">
            <img src="${assetUrl(item.assetKey, 'cover.jpg')}" alt="${item.title}" />
          </div>
        </div>
      </header>

      <main class="detail-main">
        <section class="detail-section" id="section-input">
          <div class="section-heading">
            <span class="section-kicker">输入</span>
            <h2>原始输入内容</h2>
          </div>
          <div class="script-panel input-panel">
            <pre>${htmlEscape(inputText)}</pre>
          </div>
        </section>

        <section class="detail-section" id="section-script">
          <div class="section-heading">
            <span class="section-kicker">剧本</span>
            <h2>完整剧本全文</h2>
          </div>
          <div class="script-panel">
            <pre>${htmlEscape(script)}</pre>
          </div>
        </section>

        <section class="detail-section" id="section-boards">
          <div class="section-heading">
            <span class="section-kicker">分镜图</span>
            <h2>按镜头顺序完整展开</h2>
          </div>
          <div class="media-grid">
            ${orderedShots
              .map((shot, index) => {
                const copy = item.shotCopy[index]
                return `
                  <article class="media-card">
                    <img src="${assetUrl(item.assetKey, `storyboards/${shot.id}.png`)}" alt="${item.title} 分镜 ${index + 1}" loading="lazy" />
                    <div class="media-copy">
                      <span class="media-index">镜头 ${String(index + 1).padStart(2, '0')}</span>
                      <h3>${copy?.title ?? `镜头 ${index + 1}`}</h3>
                      <p>${copy?.summary ?? shot.shot_purpose ?? '镜头内容说明。'}</p>
                    </div>
                  </article>
                `
              })
              .join('')}
          </div>
        </section>

        <section class="detail-section" id="section-shots">
          <div class="section-heading">
            <span class="section-kicker">分镜视频</span>
            <h2>每个镜头逐个展示</h2>
          </div>
          <div class="media-grid">
            ${orderedShots
              .map((shot, index) => {
                const copy = item.shotCopy[index]
                return `
                  <article class="media-card">
                    <video controls playsinline preload="metadata" poster="${assetUrl(item.assetKey, `storyboards/${shot.id}.png`)}">
                      <source src="${assetUrl(item.assetKey, `shots/${shot.id}.mp4`)}" type="video/mp4" />
                    </video>
                    <div class="media-copy">
                      <span class="media-index">镜头 ${String(index + 1).padStart(2, '0')}</span>
                      <h3>${copy?.title ?? `镜头 ${index + 1}`}</h3>
                      <p>${copy?.summary ?? shot.subject_action ?? '镜头视频片段。'}</p>
                    </div>
                  </article>
                `
              })
              .join('')}
          </div>
        </section>

        <section class="detail-section" id="section-final">
          <div class="section-heading">
            <span class="section-kicker">最终视频</span>
            <h2>完整成片</h2>
          </div>
          <article class="final-panel">
            <video controls playsinline preload="metadata" poster="${assetUrl(item.assetKey, 'cover.jpg')}">
              <source src="${assetUrl(item.assetKey, 'final/final_video.mp4')}" type="video/mp4" />
            </video>
            <div class="final-copy">
              <span class="media-index">成片说明</span>
              <p>按照镜头顺序拼接生成的最终视频，可直接查看完整效果。</p>
            </div>
          </article>
        </section>
      </main>
    </div>
  `
}

type Route =
  | { kind: 'home' }
  | { kind: 'case'; item: ShowcaseCase }

const getRoute = (): Route => {
  const hash = window.location.hash.replace(/^#/, '').replace(/^\/+/, '')

  if (!hash) {
    return { kind: 'home' }
  }

  if (!hash.startsWith('case/')) {
    return { kind: 'home' }
  }

  const slug = hash.slice('case/'.length)
  const item = caseMap.get(slug)

  if (!item) {
    return { kind: 'home' }
  }

  return { kind: 'case', item }
}

let renderToken = 0

const render = async (): Promise<void> => {
  const currentToken = ++renderToken
  const route = getRoute()

  window.scrollTo({ top: 0, behavior: 'auto' })

  if (route.kind === 'home') {
    updateMeta()
    app.innerHTML = renderHome()
    return
  }

  updateMeta(route.item)
  app.innerHTML = renderLoading(route.item)

  try {
    const [inputText, script, storyboard] = await Promise.all([
      loadInput(route.item),
      loadScript(route.item),
      loadStoryboard(route.item),
    ])
    if (currentToken !== renderToken) {
      return
    }

    app.innerHTML = renderCaseDetail(route.item, inputText, script, storyboard)
  } catch (error) {
    console.error(error)
    if (currentToken !== renderToken) {
      return
    }

    app.innerHTML = renderError(route.item)
  }
}

app.addEventListener('click', (event) => {
  const target = event.target as HTMLElement | null
  const trigger = target?.closest<HTMLElement>('[data-scroll-target]')

  if (!trigger) {
    return
  }

  event.preventDefault()
  const sectionId = trigger.dataset.scrollTarget

  if (!sectionId) {
    return
  }

  document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
})

window.addEventListener('hashchange', () => {
  void render()
})

void render()
