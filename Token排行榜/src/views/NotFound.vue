<<template>
  <div class="notfound-page">
    <!-- Header -->
    <div class="header">
      <span class="back-btn" @click="goHome">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        返回
      </span>
    </div>

    <!-- 404 Title -->
    <div class="title-section">
      <h1 class="title-404">404</h1>
      <p class="subtitle">JIUFU FINANCE</p>
    </div>

    <!-- 3D Icons Grid -->
    <div class="content">
      <div class="icons-grid">
        <!-- Row 1 -->
        <div class="icon-item">
          <svg viewBox="0 0 120 120" class="icon-svg">
            <!-- 双开门柜 -->
            <defs>
              <linearGradient id="cabL" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="100%" stop-color="#e8e8e8"/>
              </linearGradient>
              <linearGradient id="cabR" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#f5f5f5"/>
                <stop offset="100%" stop-color="#d5d5d5"/>
              </linearGradient>
              <linearGradient id="cabInner" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#e0e0e0"/>
                <stop offset="100%" stop-color="#c8c8c8"/>
              </linearGradient>
            </defs>
            <!-- 柜体内部 -->
            <path d="M35 35 L85 35 L85 90 L35 90 Z" fill="url(#cabInner)"/>
            <!-- 左门（打开） -->
            <path d="M35 35 L20 25 L20 80 L35 90 Z" fill="url(#cabL)"/>
            <path d="M35 35 L60 35 L60 90 L35 90 Z" fill="#f0f0f0"/>
            <path d="M45 50 L50 50 L50 75 L45 75 Z" fill="#d0d0d0"/>
            <!-- 右门（打开） -->
            <path d="M60 35 L100 25 L100 80 L60 90 Z" fill="url(#cabR)"/>
            <path d="M60 35 L85 35 L85 90 L60 90 Z" fill="#e5e5e5"/>
            <path d="M70 50 L75 50 L75 75 L70 75 Z" fill="#c0c0c0"/>
            <!-- 顶部 -->
            <path d="M20 25 L60 25 L85 35 L35 35 Z" fill="#ffffff"/>
            <path d="M60 25 L100 25 L85 35 L60 35 Z" fill="#eeeeee"/>
            <!-- 阴影 -->
            <ellipse cx="60" cy="105" rx="45" ry="6" fill="#e0e0e0" opacity="0.6"/>
          </svg>
        </div>

        <div class="icon-item">
          <svg viewBox="0 0 120 120" class="icon-svg">
            <!-- 开盖盒子 -->
            <defs>
              <linearGradient id="boxTop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="100%" stop-color="#e5e5e5"/>
              </linearGradient>
            </defs>
            <!-- 盒体 -->
            <path d="M30 50 L90 50 L90 95 L30 95 Z" fill="#f0f0f0"/>
            <path d="M30 50 L60 35 L90 50 Z" fill="#e8e8e8"/>
            <path d="M60 35 L90 50 L90 95 L60 80 Z" fill="#d8d8d8"/>
            <!-- 左翻盖 -->
            <path d="M30 50 L60 35 L40 20 L10 35 Z" fill="url(#boxTop)"/>
            <!-- 右翻盖 -->
            <path d="M60 35 L90 50 L110 35 L80 20 Z" fill="#eeeeee"/>
            <!-- 后翻盖 -->
            <path d="M40 20 L80 20 L90 50 L60 35 Z" fill="#f8f8f8"/>
            <!-- 内部 -->
            <path d="M40 20 L80 20 L90 50 L60 35 Z" fill="#d0d0d0" opacity="0.5"/>
            <!-- 飘带 -->
            <path d="M70 15 Q85 5 95 15 Q105 25 90 35" fill="none" stroke="#e0e0e0" stroke-width="2" stroke-dasharray="4 2"/>
            <ellipse cx="95" cy="12" rx="8" ry="4" fill="#f0f0f0" transform="rotate(-20 95 12)"/>
            <!-- 阴影 -->
            <ellipse cx="60" cy="105" rx="40" ry="5" fill="#e0e0e0" opacity="0.5"/>
          </svg>
        </div>

        <!-- Row 2 -->
        <div class="icon-item">
          <svg viewBox="0 0 120 120" class="icon-svg">
            <!-- 信封 -->
            <defs>
              <linearGradient id="envFront" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="100%" stop-color="#e8e8e8"/>
              </linearGradient>
            </defs>
            <!-- 信封主体 -->
            <path d="M25 45 L95 45 L95 85 L25 85 Z" fill="url(#envFront)"/>
            <!-- 信封盖（打开） -->
            <path d="M25 45 L60 65 L95 45 Z" fill="#f5f5f5"/>
            <path d="M25 45 L60 25 L95 45 Z" fill="#ffffff"/>
            <!-- 侧面厚度 -->
            <path d="M25 45 L25 85 L60 105 L60 65 Z" fill="#e0e0e0"/>
            <path d="M95 45 L95 85 L60 105 L60 65 Z" fill="#d0d0d0"/>
            <!-- 信纸露出 -->
            <path d="M35 40 L85 40 L80 25 L40 25 Z" fill="#ffffff"/>
            <path d="M40 25 L80 25 L75 15 L45 15 Z" fill="#f8f8f8"/>
            <!-- 阴影 -->
            <ellipse cx="60" cy="105" rx="40" ry="5" fill="#e0e0e0" opacity="0.5"/>
          </svg>
        </div>

        <div class="icon-item">
          <svg viewBox="0 0 120 120" class="icon-svg">
            <!-- 碎纸袋/文件袋 -->
            <defs>
              <linearGradient id="bagGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="100%" stop-color="#e0e0e0"/>
              </linearGradient>
            </defs>
            <!-- 袋体 -->
            <path d="M30 40 L90 40 L85 95 L35 95 Z" fill="url(#bagGrad)"/>
            <!-- 袋口 -->
            <path d="M30 40 L60 30 L90 40 Z" fill="#ffffff"/>
            <!-- 袋口内阴影 -->
            <path d="M35 42 L60 33 L85 42 Z" fill="#d0d0d0"/>
            <!-- 碎纸屑 -->
            <path d="M40 20 L45 15 L50 22 L45 28 Z" fill="#f0f0f0"/>
            <path d="M70 18 L75 12 L80 20 L75 26 Z" fill="#e8e8e8"/>
            <path d="M55 12 L60 8 L65 14 L60 20 Z" fill="#f5f5f5"/>
            <path d="M85 25 L90 20 L95 28 L90 34 Z" fill="#eeeeee"/>
            <!-- 侧面 -->
            <path d="M30 40 L35 95 L60 105 L60 30 Z" fill="#e5e5e5"/>
            <path d="M90 40 L85 95 L60 105 L60 30 Z" fill="#d5d5d5"/>
            <!-- 阴影 -->
            <ellipse cx="60" cy="105" rx="35" ry="5" fill="#e0e0e0" opacity="0.5"/>
          </svg>
        </div>

        <!-- Row 3 -->
        <div class="icon-item">
          <svg viewBox="0 0 120 120" class="icon-svg">
            <!-- 带叉文件/删除文件 -->
            <defs>
              <linearGradient id="fileGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="100%" stop-color="#e8e8e8"/>
              </linearGradient>
            </defs>
            <!-- 文件主体 -->
            <path d="M35 25 L75 25 L85 35 L85 90 L35 90 Z" fill="url(#fileGrad)"/>
            <!-- 文件折角 -->
            <path d="M75 25 L75 35 L85 35 Z" fill="#f0f0f0"/>
            <!-- 文件厚度 -->
            <path d="M35 90 L85 90 L90 95 L40 95 Z" fill="#d0d0d0"/>
            <path d="M85 35 L85 90 L90 95 L90 40 Z" fill="#c8c8c8"/>
            <!-- 叉号 -->
            <path d="M50 45 L70 65" stroke="#d0d0d0" stroke-width="3" stroke-linecap="round"/>
            <path d="M70 45 L50 65" stroke="#d0d0d0" stroke-width="3" stroke-linecap="round"/>
            <!-- 顶部线条 -->
            <path d="M45 55 L75 55" stroke="#e0e0e0" stroke-width="2"/>
            <path d="M45 65 L75 65" stroke="#e0e0e0" stroke-width="2"/>
            <!-- 阴影 -->
            <ellipse cx="60" cy="105" rx="35" ry="5" fill="#e0e0e0" opacity="0.5"/>
          </svg>
        </div>

        <div class="icon-item">
          <svg viewBox="0 0 120 120" class="icon-svg">
            <!-- 抽屉柜 -->
            <defs>
              <linearGradient id="drawerGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="100%" stop-color="#e5e5e5"/>
              </linearGradient>
            </defs>
            <!-- 柜体 -->
            <path d="M30 30 L90 30 L90 95 L30 95 Z" fill="url(#drawerGrad)"/>
            <!-- 柜体顶部 -->
            <path d="M30 30 L60 20 L90 30 Z" fill="#ffffff"/>
            <!-- 柜体侧面 -->
            <path d="M30 30 L30 95 L60 105 L60 20 Z" fill="#e8e8e8"/>
            <path d="M90 30 L90 95 L60 105 L60 20 Z" fill="#d0d0d0"/>
            <!-- 抽屉1 -->
            <path d="M38 38 L82 38 L82 52 L38 52 Z" fill="#f5f5f5"/>
            <path d="M38 38 L60 32 L82 38 Z" fill="#ffffff"/>
            <path d="M38 38 L60 32 L60 46 L38 52 Z" fill="#e0e0e0"/>
            <path d="M82 38 L60 32 L60 46 L82 52 Z" fill="#c8c8c8"/>
            <!-- 把手1 -->
            <rect x="52" y="42" width="16" height="4" rx="2" fill="#d0d0d0"/>
            <!-- 抽屉2 -->
            <path d="M38 56 L82 56 L82 70 L38 70 Z" fill="#f0f0f0"/>
            <path d="M38 56 L60 50 L82 56 Z" fill="#f8f8f8"/>
            <path d="M38 56 L60 50 L60 64 L38 70 Z" fill="#d8d8d8"/>
            <path d="M82 56 L60 50 L60 64 L82 70 Z" fill="#c0c0c0"/>
            <!-- 把手2 -->
            <rect x="52" y="60" width="16" height="4" rx="2" fill="#c8c8c8"/>
            <!-- 抽屉3 -->
            <path d="M38 74 L82 74 L82 88 L38 88 Z" fill="#eeeeee"/>
            <path d="M38 74 L60 68 L82 74 Z" fill="#f5f5f5"/>
            <path d="M38 74 L60 68 L60 82 L38 88 Z" fill="#d0d0d0"/>
            <path d="M82 74 L60 68 L60 82 L82 88 Z" fill="#b8b8b8"/>
            <!-- 把手3 -->
            <rect x="52" y="78" width="16" height="4" rx="2" fill="#c0c0c0"/>
            <!-- 阴影 -->
            <ellipse cx="60" cy="105" rx="40" ry="5" fill="#e0e0e0" opacity="0.5"/>
          </svg>
        </div>

        <!-- Row 4 -->
        <div class="icon-item">
          <svg viewBox="0 0 120 120" class="icon-svg">
            <!-- 剪贴板 -->
            <defs>
              <linearGradient id="clipGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="100%" stop-color="#e8e8e8"/>
              </linearGradient>
            </defs>
            <!-- 板子 -->
            <path d="M30 35 L90 35 L90 95 L30 95 Z" fill="url(#clipGrad)"/>
            <!-- 板子厚度 -->
            <path d="M30 95 L90 95 L95 100 L35 100 Z" fill="#d0d0d0"/>
            <path d="M90 35 L90 95 L95 100 L95 40 Z" fill="#c0c0c0"/>
            <!-- 顶部夹子 -->
            <path d="M45 25 L75 25 L75 35 L45 35 Z" fill="#f5f5f5"/>
            <path d="M45 25 L60 20 L75 25 Z" fill="#ffffff"/>
            <path d="M45 25 L60 20 L60 30 L45 35 Z" fill="#e0e0e0"/>
            <path d="M75 25 L60 20 L60 30 L75 35 Z" fill="#c8c8c8"/>
            <!-- 夹子弹簧 -->
            <rect x="55" y="22" width="10" height="6" rx="3" fill="#d0d0d0"/>
            <!-- 纸张 -->
            <path d="M38 40 L82 40 L82 88 L38 88 Z" fill="#ffffff"/>
            <!-- 纸张线条 -->
            <path d="M45 50 L75 50" stroke="#e8e8e8" stroke-width="2"/>
            <path d="M45 58 L75 58" stroke="#e8e8e8" stroke-width="2"/>
            <path d="M45 66 L60 66" stroke="#e8e8e8" stroke-width="2"/>
            <!-- 对勾 -->
            <path d="M48 72 L55 80 L72 62" stroke="#d0d0d0" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- 阴影 -->
            <ellipse cx="60" cy="105" rx="38" ry="5" fill="#e0e0e0" opacity="0.5"/>
          </svg>
        </div>

        <div class="icon-item">
          <svg viewBox="0 0 120 120" class="icon-svg">
            <!-- 折叠盒/空盒 -->
            <defs>
              <linearGradient id="foldGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#ffffff"/>
                <stop offset="100%" stop-color="#e0e0e0"/>
              </linearGradient>
            </defs>
            <!-- 盒底 -->
            <path d="M30 60 L90 60 L90 95 L30 95 Z" fill="url(#foldGrad)"/>
            <!-- 盒底厚度 -->
            <path d="M30 95 L90 95 L95 100 L35 100 Z" fill="#d0d0d0"/>
            <path d="M90 60 L90 95 L95 100 L95 65 Z" fill="#c0c0c0"/>
            <!-- 前翻盖（打开） -->
            <path d="M30 60 L90 60 L80 40 L40 40 Z" fill="#f5f5f5"/>
            <path d="M30 60 L40 40 L40 40 L30 60 Z" fill="#e8e8e8"/>
            <!-- 左翻盖 -->
            <path d="M30 60 L40 40 L20 35 L10 55 Z" fill="#ffffff"/>
            <!-- 右翻盖 -->
            <path d="M90 60 L80 40 L100 35 L110 55 Z" fill="#eeeeee"/>
            <!-- 内部 -->
            <path d="M40 40 L80 40 L90 60 L30 60 Z" fill="#d8d8d8" opacity="0.6"/>
            <!-- 折叠线 -->
            <path d="M40 40 L30 60" stroke="#e0e0e0" stroke-width="1"/>
            <path d="M80 40 L90 60" stroke="#e0e0e0" stroke-width="1"/>
            <!-- 阴影 -->
            <ellipse cx="60" cy="105" rx="40" ry="5" fill="#e0e0e0" opacity="0.5"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goHome() {
  router.push('/login')
}
</script>

<style scoped>
.notfound-page {
  width: 100%;
  min-height: 100vh;
  background: #f5f5f7;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.header {
  padding: 16px 20px;
  padding-top: 20px;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #333;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  width: fit-content;
}

.back-btn:active {
  opacity: 0.7;
}

.title-section {
  text-align: center;
  padding-top: 8px;
  margin-bottom: 24px;
}

.title-404 {
  font-size: 56px;
  font-weight: 800;
  color: #1a1a1a;
  letter-spacing: 6px;
  margin: 0;
  line-height: 1.1;
}

.subtitle {
  font-size: 12px;
  color: #aaa;
  letter-spacing: 4px;
  margin: 10px 0 0;
  text-transform: uppercase;
  font-weight: 500;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 20px 40px;
}

.icons-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 24px;
  max-width: 340px;
  width: 100%;
}

.icon-item {
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;
}

.icon-svg {
  width: 100%;
  height: 100%;
  max-width: 130px;
  max-height: 130px;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.04));
}
</style>