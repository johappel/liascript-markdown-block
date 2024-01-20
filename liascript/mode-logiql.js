ace.define("ace/mode/logiql_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],(function(e,t,n){"use strict";var o=e("../lib/oop"),r=e("./text_highlight_rules").TextHighlightRules,i=function(){this.$rules={start:[{token:"comment.block",regex:"/\\*",push:[{token:"comment.block",regex:"\\*/",next:"pop"},{defaultToken:"comment.block"}]},{token:"comment.single",regex:"//.*"},{token:"constant.numeric",regex:"\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?[fd]?"},{token:"string",regex:'"',push:[{token:"string",regex:'"',next:"pop"},{defaultToken:"string"}]},{token:"constant.language",regex:"\\b(true|false)\\b"},{token:"entity.name.type.logicblox",regex:"`[a-zA-Z_:]+(\\d|\\a)*\\b"},{token:"keyword.start",regex:"->",comment:"Constraint"},{token:"keyword.start",regex:"--\x3e",comment:"Level 1 Constraint"},{token:"keyword.start",regex:"<-",comment:"Rule"},{token:"keyword.start",regex:"<--",comment:"Level 1 Rule"},{token:"keyword.end",regex:"\\.",comment:"Terminator"},{token:"keyword.other",regex:"!",comment:"Negation"},{token:"keyword.other",regex:",",comment:"Conjunction"},{token:"keyword.other",regex:";",comment:"Disjunction"},{token:"keyword.operator",regex:"<=|>=|!=|<|>",comment:"Equality"},{token:"keyword.other",regex:"@",comment:"Equality"},{token:"keyword.operator",regex:"\\+|-|\\*|/",comment:"Arithmetic operations"},{token:"keyword",regex:"::",comment:"Colon colon"},{token:"support.function",regex:"\\b(agg\\s*<<)",push:[{include:"$self"},{token:"support.function",regex:">>",next:"pop"}]},{token:"storage.modifier",regex:"\\b(lang:[\\w:]*)"},{token:["storage.type","text"],regex:"(export|sealed|clauses|block|alias|alias_all)(\\s*\\()(?=`)"},{token:"entity.name",regex:"[a-zA-Z_][a-zA-Z_0-9:]*(@prev|@init|@final)?(?=(\\(|\\[))"},{token:"variable.parameter",regex:"([a-zA-Z][a-zA-Z_0-9]*|_)\\s*(?=(,|\\.|<-|->|\\)|\\]|=))"}]},this.normalizeRules()};o.inherits(i,r),t.LogiQLHighlightRules=i})),ace.define("ace/mode/folding/coffee",["require","exports","module","ace/lib/oop","ace/mode/folding/fold_mode","ace/range"],(function(e,t,n){"use strict";var o=e("../../lib/oop"),r=e("./fold_mode").FoldMode,i=e("../../range").Range,a=t.FoldMode=function(){};o.inherits(a,r),function(){this.commentBlock=function(e,t){var n=/\S/,o=e.getLine(t),r=o.search(n);if(-1!=r&&"#"==o[r]){for(var a=o.length,s=e.getLength(),c=t,g=t;++t<s;){var l=(o=e.getLine(t)).search(n);if(-1!=l){if("#"!=o[l])break;g=t}}if(g>c){var u=e.getLine(g).length;return new i(c,a,g,u)}}},this.getFoldWidgetRange=function(e,t,n){var o=this.indentationBlock(e,n);return o||((o=this.commentBlock(e,n))||void 0)},this.getFoldWidget=function(e,t,n){var o=e.getLine(n),r=o.search(/\S/),i=e.getLine(n+1),a=e.getLine(n-1),s=a.search(/\S/),c=i.search(/\S/);if(-1==r)return e.foldWidgets[n-1]=-1!=s&&s<c?"start":"","";if(-1==s){if(r==c&&"#"==o[r]&&"#"==i[r])return e.foldWidgets[n-1]="",e.foldWidgets[n+1]="","start"}else if(s==r&&"#"==o[r]&&"#"==a[r]&&-1==e.getLine(n-2).search(/\S/))return e.foldWidgets[n-1]="start",e.foldWidgets[n+1]="","";return e.foldWidgets[n-1]=-1!=s&&s<r?"start":"",r<c?"start":""}}.call(a.prototype)})),ace.define("ace/mode/matching_brace_outdent",["require","exports","module","ace/range"],(function(e,t,n){"use strict";var o=e("../range").Range,r=function(){};(function(){this.checkOutdent=function(e,t){return!!/^\s+$/.test(e)&&/^\s*\}/.test(t)},this.autoOutdent=function(e,t){var n=e.getLine(t).match(/^(\s*\})/);if(!n)return 0;var r=n[1].length,i=e.findMatchingBracket({row:t,column:r});if(!i||i.row==t)return 0;var a=this.$getIndent(e.getLine(i.row));e.replace(new o(t,0,t,r-1),a)},this.$getIndent=function(e){return e.match(/^\s*/)[0]}}).call(r.prototype),t.MatchingBraceOutdent=r})),ace.define("ace/mode/logiql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/logiql_highlight_rules","ace/mode/folding/coffee","ace/token_iterator","ace/range","ace/mode/matching_brace_outdent"],(function(e,t,n){"use strict";var o=e("../lib/oop"),r=e("./text").Mode,i=e("./logiql_highlight_rules").LogiQLHighlightRules,a=e("./folding/coffee").FoldMode,s=e("../token_iterator").TokenIterator,c=e("../range").Range,g=e("./matching_brace_outdent").MatchingBraceOutdent,l=function(){this.HighlightRules=i,this.foldingRules=new a,this.$outdent=new g,this.$behaviour=this.$defaultBehaviour};o.inherits(l,r),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var o=this.$getIndent(t),r=this.getTokenizer().getLineTokens(t,e),i=r.tokens,a=r.state;if(/comment|string/.test(a))return o;if(i.length&&"comment.single"==i[i.length-1].type)return o;t.match();return/(-->|<--|<-|->|{)\s*$/.test(t)&&(o+=n),o},this.checkOutdent=function(e,t,n){return!!this.$outdent.checkOutdent(t,n)||("\n"===n||"\r\n"===n)&&!!/^\s+/.test(t)},this.autoOutdent=function(e,t,n){if(!this.$outdent.autoOutdent(t,n)){var o=t.getLine(n),r=o.match(/^\s+/),i=o.lastIndexOf(".")+1;if(!r||!n||!i)return 0;t.getLine(n+1);var a=this.getMatching(t,{row:n,column:i});if(!a||a.start.row==n)return 0;i=r[0].length;var s=this.$getIndent(t.getLine(a.start.row));t.replace(new c(n+1,0,n+1,i),s)}},this.getMatching=function(e,t,n){null==t&&(t=e.selection.lead),"object"==typeof t&&(n=t.column,t=t.row);var o,r=e.getTokenAt(t,n),i="keyword.start",a="keyword.end";if(r){if(r.type==i){(g=new s(e,t,n)).step=g.stepForward}else{if(r.type!=a)return;var g;(g=new s(e,t,n)).step=g.stepBackward}for(;(o=g.step())&&o.type!=i&&o.type!=a;);if(o&&o.type!=r.type){var l=g.getCurrentTokenColumn();t=g.getCurrentTokenRow();return new c(t,l,t,l+o.value.length)}}},this.$id="ace/mode/logiql"}.call(l.prototype),t.Mode=l})),ace.require(["ace/mode/logiql"],(function(e){"object"==typeof module&&"object"==typeof exports&&module&&(module.exports=e)}));
