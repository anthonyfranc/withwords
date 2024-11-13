import { ref, onMounted, onUnmounted } from 'vue'

export const useSmooth = () => {
  const isUserScrolled = ref(false)
  const showNewMessage = ref(false)
  let scrollListener: null | (() => void) = null
  
  const scrollToBottom = (container: HTMLElement | null, options = { smooth: true, duration: 300, force: false }) => {
    if (!container) return
    
    const isAtBottom = () => {
      const threshold = 100 // pixels from bottom
      return container.scrollHeight - container.clientHeight - container.scrollTop <= threshold
    }

    // Don't scroll if user has scrolled up and force is not true
    if (!options.force && isUserScrolled.value && !isAtBottom()) {
      showNewMessage.value = true
      return
    }

    const start = container.scrollTop
    const end = container.scrollHeight - container.clientHeight
    const change = end - start
    const startTime = performance.now()

    const easeOutQuart = (x: number): number => {
      return 1 - Math.pow(1 - x, 4)
    }

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / options.duration, 1)

      container.scrollTop = start + change * easeOutQuart(progress)

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      } else {
        showNewMessage.value = false
      }
    }

    if (options.smooth) {
      requestAnimationFrame(animateScroll)
    } else {
      container.scrollTop = end
      showNewMessage.value = false
    }
  }

  const handleScroll = (container: HTMLElement | null) => {
    if (!container) return

    const threshold = 100 // pixels from bottom
    isUserScrolled.value = container.scrollHeight - container.clientHeight - container.scrollTop > threshold
  }

  const initScrollListener = (container: HTMLElement | null) => {
    if (!container) return

    // Remove existing listener if any
    if (scrollListener) {
      container.removeEventListener('scroll', scrollListener)
    }

    // Create new listener
    scrollListener = () => handleScroll(container)
    container.addEventListener('scroll', scrollListener)
  }

  onUnmounted(() => {
    if (scrollListener) {
      // Clean up listener on component unmount
      document.removeEventListener('scroll', scrollListener)
    }
  })

  return {
    scrollToBottom,
    initScrollListener,
    isUserScrolled,
    showNewMessage
  }
}