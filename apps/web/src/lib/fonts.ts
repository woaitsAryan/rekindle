import localFont from 'next/font/local';

export const gowunBatang = localFont({
  src: [
    {
      path: '../../public/fonts/GowunBatang-Bold.ttf',
      style: 'normal',
      weight: '700'
    },
    {
      path: '../../public/fonts/GowunBatang-Regular.ttf',
      style: 'normal',
      weight: '400'
    },
  ],
  variable: '--font-gowun-batang'
})

export const quicksand = localFont({
  src: '../../public/fonts/Quicksand-Variable.ttf',
  variable: '--font-quicksand'
})

export const inter = localFont({
  src: '../../public/fonts/Inter-Variable.ttf',
  variable: '--font-inter'
})