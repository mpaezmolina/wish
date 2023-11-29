function GA(props) {
  function createMarkup() {
    return {
      __html:
        "<script async src='https://www.googletagmanager.com/gtag/js?id=G-B5V5L4NYRC'></script><script>window.dataLayer = window.dataLayer || [];function gtag() { dataLayer.push(arguments); }gtag('js', new Date());gtag('config', 'G-B5V5L4NYRC');</script>",
    };
  }
  return <div dangerouslySetInnerHTML={createMarkup()} />;
}

export default GA;
