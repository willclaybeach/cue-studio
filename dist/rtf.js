/* RTF text extraction: groups, escaped characters, Unicode and common destinations. */
function rtfToText(source){
 if(!/^\s*\{\\rtf/.test(source))throw Error('This file is not valid RTF.');
 const stack=[];let state={skip:false,uc:1},out='',i=0,skipChars=0;
 const destinations=new Set(['fonttbl','colortbl','stylesheet','info','pict','object','header','footer','filetbl','listtable','listoverridetable','generator','fldinst','datastore','themedata','colorschememapping']);
 const put=s=>{if(skipChars>0){skipChars--;return;}if(!state.skip)out+=s;};
 while(i<source.length){let c=source[i++];if(c==='{'){stack.push({...state});continue;}if(c==='}'){state=stack.pop()||state;continue;}if(c==='\r'||c==='\n')continue;if(c!=='\\'){put(c);continue;}
 c=source[i++];if(c==='\\'||c==='{'||c==='}'){put(c);continue;}if(c==='*'){state.skip=true;continue;}if(c==="'"){const hex=source.slice(i,i+2);i+=2;if(/^[0-9a-f]{2}$/i.test(hex))put(new TextDecoder('windows-1252').decode(new Uint8Array([parseInt(hex,16)])));continue;}
 if(!/[a-z]/i.test(c||'')){if(c==='~')put('\u00a0');if(c==='_')put('‑');continue;}
 let word=c;while(/[a-z]/i.test(source[i]||'')&&i<source.length)word+=source[i++];let number='';if(source[i]==='-')number+=source[i++];while(/[0-9]/.test(source[i]||'')&&i<source.length)number+=source[i++];if(source[i]===' ')i++;const n=Number(number);
 if(destinations.has(word))state.skip=true;
 if(word==='bin'){i+=Math.max(0,n);continue;}if(word==='uc'){state.uc=n;continue;}if(word==='u'){if(!state.skip)out+=String.fromCharCode(n<0?n+65536:n);skipChars=state.uc;continue;}
 const chars={par:'\n',line:'\n',tab:'\t',emdash:'—',endash:'–',lquote:'‘',rquote:'’',ldblquote:'“',rdblquote:'”',bullet:'•'};if(chars[word])put(chars[word]);
 }return out.trim();
}
if(typeof module!=='undefined')module.exports={rtfToText};
