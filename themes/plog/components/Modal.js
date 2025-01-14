import { ArrowPath, ChevronLeft, ChevronRight } from '@/components/HeroIcons'
import LazyImage from '@/components/LazyImage'
import { compressImage } from '@/lib/notion/mapImage'
import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import { Fragment, useRef, useState } from 'react'
import { usePlogGlobal } from '..'
import Image from 'next/image'
import TagItem from './TagItem'
import md5 from 'js-md5'
import { siteConfig } from '@/lib/config'
import NotionIcon from '@/components/NotionIcon'

/**
 * 弹出框
 */
export default function Modal(props) {
  const { showModal, setShowModal, modalContent, setModalContent } =
    usePlogGlobal()
  const { siteInfo, posts } = props
  const cancelButtonRef = useRef(null)
  const thumbnail =
    modalContent?.pageCoverThumbnail || siteInfo?.pageCoverThumbnail
  const bigImage = compressImage(
    modalContent?.pageCover || siteInfo?.pageCover,
    1200,
    85,
    'webp'
  )
  const imgRef = useRef(null)

  // 添加loading状态
  const [loading, setLoading] = useState(true)

  // 在图片加载完成时设置loading为false
  function handleImageLoad() {
    setLoading(false)
  }

  // 关闭弹窗
  function handleClose() {
    setShowModal(false)
    setLoading(true)
  }

  // 修改当前显示的遮罩内容
  function prev() {
    setLoading(true)
    const index = posts?.findIndex(post => post.slug === modalContent.slug)
    if (index === 0) {
      setModalContent(posts[posts.length - 1])
    } else {
      setModalContent(posts[index - 1])
    }
  }
  // 下一个
  const next = () => {
    setLoading(true)
    const index = posts.findIndex(post => post.slug === modalContent.slug)
    if (index === posts.length - 1) {
      setModalContent(posts[0])
    } else {
      setModalContent(posts[index + 1])
    }
  }

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-20'
        initialFocus={cancelButtonRef}
        onClose={handleClose}>
        {/* 遮罩 */}
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            className='fixed inset-0 glassmorphism transition-opacity'
          />
        </Transition.Child>

        <div className='fixed inset-0 z-30 overflow-y-auto'>
          <div className='flex min-h-full justify-center p-4 text-center items-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 scale-50 w-0'
              enterTo={'opacity-100 translate-y-0 max-w-screen'}
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 scale-100  max-w-screen'
              leaveTo='opacity-0 translate-y-4 scale-50 w-0'>
              <Dialog.Panel className='group relative transform overflow-hidden rounded-xl text-left shadow-xl transition-all '>
                {/* 添加onLoad事件处理函数 */}
                {/* 添加loading状态 */}
                {/* <div
                  className={`bg-hexo-black-gray w-32 h-32 flex justify-center items-center `}> */}
                <div
                  className={`absolute right-0 bottom-0 m-4 ${loading ? '' : 'hidden'}`}>
                  <ArrowPath
                    className={`w-10 h-10 animate-spin text-gray-200`}
                  />
                </div>

                {/* </div> */}
export const ArticleInfo = (props) => {
  const { post } = props

  const emailHash = md5(siteConfig('CONTACT_EMAIL', '#'))

  return <section className="flex-wrap flex mt-2 text-gray--600 dark:text-gray-400 font-light leading-8">
        <div>

            <h1 className="font-bold text-3xl text-black dark:text-white">
                {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post?.pageIcon} />}{post?.title}
            </h1>

            {post?.type !== 'Page' && <>
            <nav className="flex mt-7 items-start text-gray-500 dark:text-gray-400">
            <div className="flex mb-4">
              <a href={siteConfig('CONTACT_GITHUB') || '#'} className="flex">
                <Image
                  alt={siteConfig('AUTHOR')}
                  width={24}
                  height={24}
                  src={`https://gravatar.com/avatar/${emailHash}`}
                  className="rounded-full"
                />
                <p className="ml-2 md:block">{siteConfig('AUTHOR')}</p>
              </a>
              <span className="block">&nbsp;/&nbsp;</span>
            </div>
            <div className="mr-2 mb-4 md:ml-0">
              {post?.publishDay}
            </div>
            {post?.tags && (
              <div className="flex flex-nowrap max-w-full overflow-x-auto article-tags">
                {post?.tags.map(tag => (
                  <TagItem key={tag} tag={tag} />
                ))}
              </div>
            )}
            <span className="hidden busuanzi_container_page_pv mr-2">
                    <i className='mr-1 fas fa-eye' />
                    &nbsp;
                    <span className="mr-2 busuanzi_value_page_pv" />
                </span>
             </nav>
            </>}

        </div>

    </section>
}
                  {/* 卡片的阴影遮罩，为了凸显图片上的文字 */}
                  <div className='h-1/2 w-full absolute left-0 bottom-0'>
                    <div className='h-full w-full absolute opacity-80 group-hover:opacity-100 transition-all duration-1000 bg-gradient-to-b from-transparent to-black'></div>
                  </div>

                  {/* <div className="z-10 absolute hover:opacity-50 opacity-0 duration-200 transition-opacity w-full top-0 left-0 px-4 h-full items-center flex justify-between"> */}

                  <div
                    onClick={prev}
                    className='z-10 absolute left-0 top-1/2 -mt-12 group-hover:opacity-50 opacity-0 duration-200 transition-opacity'>
                    <ChevronLeft className='cursor-pointer w-24 h-32 hover:opacity-100 stroke-white stroke-1 scale-y-150' />
                  </div>
                  <div
                    onClick={next}
                    className='z-10 absolute right-0 top-1/2 -mt-12 group-hover:opacity-50 opacity-0 duration-200 transition-opacity'>
                    <ChevronRight className='cursor-pointer w-24 h-32 hover:opacity-100 stroke-white stroke-1 scale-y-150' />
                  </div>
                  {/* </div> */}
                </>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
