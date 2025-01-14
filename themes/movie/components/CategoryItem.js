import Link from 'next/link'

/**
 * 文章分类
 * @param {*} param0
 * @returns
 */
export default function CategoryItem({ category }) {
  return (
        <Link
            key={category.name}
            href={`/category/${category.name}`}
            passHref
            legacyBehavior>
        </Link>
  )
}
