import LazyImage from '@/components/LazyImage'
import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import TagItemMini from './TagItemMini'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  // 主题默认强制显示图片
  if (post && !post.pageCoverThumbnail) {
    post.pageCoverThumbnail =
      siteInfo?.pageCover || siteConfig('RANDOM_IMAGE_URL')
  }

  return (
    <article
      data-wow-delay='.2s'
      className='wow fadeInUp w-full mb-4 cursor-pointer overflow-hidden shadow-movie text-white'>
      <Link href={post?.href} passHref legacyBehavior>
        {/* 固定高度 ，空白用图片拉升填充 */}
        <div className='group flex flex-col aspect-[1/1] justify-between relative'>
          {/* 图片 填充卡片 */}
          <div className='flex flex-grow w-full h-full relative duration-200  cursor-pointer transform overflow-hidden'>
            <LazyImage
              src={post?.pageCoverThumbnail}
              alt={post.title}
              className='h-full w-full group-hover:brightness-90 group-hover:scale-105 transform object-cover duration-500'
            />
       </div>
          <div className='h-3/4 w-full absolute left-0 bottom-0 z-10'>
            <div className='h-full w-full absolute opacity-80 group-hover:opacity-100 transition-all duration-1000'></div>
          </div>
        </div>
      </Link>
    </article>
  )
}

export default BlogPostCard
