function clearElements(className, arg) {
  const arrHtml = document.getElementsByClassName(className);
  if (arg === 'none') {
    for (let i = 0; i < arrHtml.length; i++) {
      arrHtml[i].style.display='none'
    }
  } else {
    while (!!arrHtml.length) {
      arrHtml[0].parentNode.removeChild(arrHtml[0])
    }

  }
}
clearElements('col-sm-12 overall-section')
clearElements('card_footer clearfix')
clearElements('col-xs-2')
clearElements('correct-answers block')
clearElements('blockquote-solution')
clearElements('question-heading')