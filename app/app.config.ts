export default defineAppConfig({
    ui: {
      primary: 'green',
      gray: 'neutral',
      fonts: {
        sans: 'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
      },
      card: {
        ring: 'ring-1 ring-gray-200 dark:ring-gray-800',
        rounded: 'rounded-md',
        shadow: ''
      },
      modal: {
        wrapper: 'relative z-50',
        inner: 'fixed inset-0 overflow-y-auto ',
        container: 'flex min-h-full items-end sm:items-center justify-center text-center',
        padding: 'p-4 sm:p-0',
        margin: 'sm:my-8',
        base: 'relative text-left rtl:text-right flex flex-col',
        overlay: {
          base: 'fixed inset-0',
          background: 'backdrop-blur-sm bg-black/40',
          transition: {
            default: 'transition-opacity ease-out duration-300',
            enter: 'ease-out duration-300',
            enterFrom: 'opacity-0',
            enterTo: 'opacity-100',
            leave: 'ease-in duration-200',
            leaveFrom: 'opacity-100',
            leaveTo: 'opacity-0',
          },
        },
        background: 'bg-white dark:bg-gray-900',
        ring: 'dark:border dark:border-gray-200/15 border border-gray-400',
        rounded: 'rounded-sm',
        shadow: '!shadow-sm',
        width: 'w-full sm:max-w-lg',
        height: '',
        fullscreen: 'w-screen h-screen',
        transition: {
          enter: 'ease-out duration-300',
          enterFrom: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
          enterTo: 'opacity-100 translate-y-0 sm:scale-100',
          leave: 'ease-in duration-200',
          leaveFrom: 'opacity-100 translate-y-0 sm:scale-100',
          leaveTo: 'opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
        },
      },
      select:{
        color: {
          white: {
            outline: 'shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600',
          },
          gray: {
            outline: 'shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600',
          },
        },
      },
      textarea:{
        color: {
          white: {
            outline: 'shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600',
          },
          gray: {
            outline: 'shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600',
          },
        },
      },
      input:{
        color: {
          white: {
            outline: 'shadow-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600',
          },
          gray: {
            outline: 'shadow-sm bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white ring-1 ring-inset ring-gray-300 dark:ring-gray-700 focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600',
          },
        },
      },
      button: {
        default: {
          loadingIcon: 'line-md:loading-twotone-loop'
        }
      }
    },
  })