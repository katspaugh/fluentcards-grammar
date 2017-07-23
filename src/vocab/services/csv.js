import { getArticle } from './formating';

export default function exportCsv(items) {
  const tsv = items.map(item => {
    const data = item.def[0];
    const article = getArticle(data, item.language);

    let word = data.text;

    if (article) word = `${ article } ${ data.text }`;

    const extra = [ data.fl, data.num || data.gen ].filter(Boolean).join(', ');
    if (extra) word += `; ${ extra }`;

    const maxDefs = 2;
    const defintions = [];
    item.def.forEach(item => item.tr.forEach(tr => defintions.push(tr.text)));
    const shortDef = defintions.slice(0, maxDefs).join('; ');

    return [ word, shortDef, item.context ].join('\t');
  }).join('\n');

  const url = 'data:text/tab-separated-values;charset=utf-8,' + encodeURIComponent(tsv);

  window.open(url);
};
