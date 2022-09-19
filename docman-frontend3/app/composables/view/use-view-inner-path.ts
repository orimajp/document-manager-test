export const useInnerPath = () => {
  const getInnerPath = (hrefs: string): string | null => {
    console.log(`navigate hrefs=${hrefs}`)
    const href = hrefs[0]
    console.log(`navigate href=${href}`)

    // 絶対パス
    if (href === '/') {
      return hrefs
    }

    // ハッシュ
    if (href === '#') {
      return hrefs
    }
    console.log(`hrefs=${hrefs}, location.origin=${location.origin}`)

    // 自サイトへのプロトコル付きリンク(何て言えばいいのか?)
    if (hrefs.startsWith(location.origin)) {
      return hrefs.slice(location.origin.length)
    }

    // 外部サイトリンク
    return null
  }

  return {
    getInnerPath
  }
}
