(this.webpackJsonpshoppies=this.webpackJsonpshoppies||[]).push([[0],{87:function(e,a,t){e.exports=t(99)},92:function(e,a,t){},99:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),i=t(9),o=t.n(i),l=(t(92),t(47)),c=t(55),m=t(23),s=t(75),u=t(149),E=t(151),d=t(148),h=t(136),p=t(131),g=t(133),f=t(150),b=t(71),v=t.n(b),y=t(138),j=Object(p.a)((function(e){return{root:{padding:"2px 4px",display:"flex"},input:{marginLeft:e.spacing(1),flex:1},iconButton:{padding:10},fontSize:{fontSize:38}}}));function N(e){var a=e.value,t=e.onChange,n=j();return r.a.createElement(g.a,{fullWidth:!0,className:n.root},r.a.createElement(f.a,{color:"primary",placeholder:"Search Movies",type:"text",value:a,onChange:t,InputProps:{startAdornment:r.a.createElement(y.a,{position:"start"},r.a.createElement(v.a,{fontSize:"large"})),classes:{input:n.fontSize}}}))}var O=t(41),w=t(147),S=t(139),k=t(153),C=t(141);function x(e){var a=e.show;return r.a.createElement(E.a,null,r.a.createElement(S.a,{in:a},r.a.createElement(k.a,{severity:"info",variant:"filled"},r.a.createElement(C.a,null,r.a.createElement(O.a,{align:"left"},r.a.createElement("strong",null,"All done!"))),r.a.createElement(O.a,{align:"left"},"You have selected 5 movies."))))}var D=t(142),I=t(155);function A(e){var a=e.isNominationSubmit,t=e.onClose;var n=function(e,a){"clickaway"!==a&&t()};return r.a.createElement(E.a,null,r.a.createElement(I.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:a,autoHideDuration:6e3,TransitionComponent:function(e){return r.a.createElement(D.a,Object.assign({},e,{direction:"down"}))},onClose:n},r.a.createElement(k.a,{severity:"success",variant:"filled",onClose:n},r.a.createElement(C.a,null,r.a.createElement(O.a,{align:"left"},r.a.createElement("strong",null,"Submission Success!"))),r.a.createElement(O.a,{align:"left"},"Your nominations have been submitted."))))}var P=t(137),z=t(143),R=t(144),T=t(156),W=t(145),B=t(146),Y=t(140),J=t(37),M=t.n(J),H=t(72),K=t.n(H);function U(e){var a=e.nominations,t=e.removeNomination;return r.a.createElement(E.a,null,r.a.createElement(P.a,{dense:!0},Object.values(a).map((function(e){return r.a.createElement(z.a,{key:e.imdbID},r.a.createElement(R.a,null,r.a.createElement(T.a,null,"N/A"===e.Poster?r.a.createElement(M.a,null):r.a.createElement("img",{src:e.Poster,alt:"movie poster",width:"100%"}))),r.a.createElement(W.a,{primary:e.Title,secondary:e.Year}),r.a.createElement(B.a,null,r.a.createElement(Y.a,{edge:"end","aria-label":"remove",onClick:function(){return t(e.imdbID)}},r.a.createElement(K.a,null))))}))))}var _=Object(p.a)((function(e){return{img:{maxWidth:280}}}));function F(e){var a=e.nominations,t=e.removeNomination,i=e.handleResetNominations,o=e.clearSearch,l=_(),c=Object(n.useState)(!1),s=Object(m.a)(c,2),u=s[0],d=s[1],h=5===Object.keys(a).length;return 0===Object.keys(a).length?r.a.createElement(E.a,null,r.a.createElement(A,{isNominationSubmit:u,onClose:function(){return d(!1)}}),r.a.createElement("img",{src:"/the-shoppies/award.png",alt:"Movie Award",className:l.img,width:"70%"}),r.a.createElement("h3",null,"No nominations yet! "),r.a.createElement(O.a,null,"Add 5 of your favorite movies to the list.")):r.a.createElement(E.a,null,r.a.createElement(x,{show:h}),r.a.createElement(U,{nominations:a,removeNomination:t}),h&&r.a.createElement(w.a,{variant:"contained",color:"primary",onClick:function(){d(!0),i(),o()},"aria-label":"reset nominations"},"Submit"))}var G=t(154),L=t(152),$=t(56),q=Object(p.a)((function(e){return{box:{padding:e.spacing(1),margin:"auto",width:210,height:400},image:{width:200,height:280},img:{margin:"auto",display:"block",maxWidth:"100%",maxHeight:"100%"},details:{width:205,height:80},noimg:{background:"#ECECEC",width:200,height:280}}}));function Q(e){var a=e.movieData,t=e.nominations,n=e.addNomination,i=q(),o=Object.keys(t).length;return r.a.createElement(d.a,{container:!0,justify:"space-evenly",spacing:2},Object.values(a).map((function(e){var a=void 0!==t[e.imdbID];return r.a.createElement(d.a,{item:!0,key:e.imdbID},r.a.createElement(E.a,{className:i.box},r.a.createElement(d.a,{container:!0,direction:"column",justify:"flex-start",alignItems:"center"},r.a.createElement(d.a,{item:!0,className:i.image},"N/A"===e.Poster?r.a.createElement(d.a,{container:!0,direction:"column",justify:"center",alignItems:"center",className:i.noimg,spacing:1},r.a.createElement(d.a,{item:!0},r.a.createElement(M.a,{fontSize:"large",style:{color:$.a[500]}})),r.a.createElement(d.a,{item:!0},r.a.createElement(E.a,{fontWeight:"Bold",style:{color:$.a[500]}},"No Poster",r.a.createElement("br",null),"Available"))):r.a.createElement("img",{className:i.img,src:e.Poster,alt:"movie poster"})),r.a.createElement(d.a,{item:!0,xs:12,sm:!0,container:!0},r.a.createElement(d.a,{item:!0,container:!0,direction:"column"},r.a.createElement(d.a,{className:i.details,item:!0},r.a.createElement(O.a,{gutterBottom:!0,variant:"subtitle2"},r.a.createElement(E.a,{component:"span",fontWeight:"fontWeightBold"},e.Title.toUpperCase()),r.a.createElement("br",null),"(",e.Year,")")),r.a.createElement(d.a,{item:!0},r.a.createElement(w.a,{variant:"contained",onClick:function(){return n(e.imdbID)},disabled:a||5===o,color:"primary"},a?"Nominated!":"Nominate")))))))})))}function V(e){var a=e.movieData,t=e.nominations,n=e.addNomination,i=Object.keys(t).length;return r.a.createElement(E.a,null,r.a.createElement(P.a,{dense:!0},Object.values(a).map((function(e){var a=void 0!==t[e.imdbID];return r.a.createElement(z.a,{key:e.imdbID},r.a.createElement(R.a,null,r.a.createElement(T.a,null,"N/A"===e.Poster?r.a.createElement(M.a,null):r.a.createElement("img",{src:e.Poster,alt:"movie poster",width:"100%"}))),r.a.createElement(W.a,{primary:e.Title,secondary:e.Year}),r.a.createElement(B.a,null,r.a.createElement(w.a,{variant:"contained",onClick:function(){return n(e.imdbID)},disabled:a||5===i,color:"primary",size:"small",edge:"end"},a?"Nominated!":"Nominate")))}))))}var X=Object(p.a)((function(e){return{pagination:{display:"flex",justifyContent:"center"}}}));function Z(e){var a=e.searchKey,t=e.isError,n=(e.error,e.numResult),i=e.addNomination,o=e.movieData,l=e.nominations,c=e.page,m=e.handlePageChange,s=X();return a.length<3?r.a.createElement(E.a,null,r.a.createElement("h3",null,r.a.createElement("span",{role:"img","aria-label":"find"},"\ud83d\udd0d")," ","Find a movie in the search bar above!"),r.a.createElement("p",null,"The keyword needs to be longer than 2 characters")):t?r.a.createElement(E.a,null,r.a.createElement("h3",null,r.a.createElement("span",{role:"img","aria-label":"film"},"\ud83c\udf9e\ufe0f"),"  ",'No match for "',a,'" (',0,")"),r.a.createElement("p",null,r.a.createElement("span",{role:"img","aria-label":"confused"},"\ud83d\ude35")," ","Check your spelling or try continue typing")):r.a.createElement(E.a,null,r.a.createElement("h3",null,r.a.createElement("span",{role:"img","aria-label":"film"},"\ud83c\udf9e\ufe0f")," ",'Results for "',a,'" (',n,")"),r.a.createElement(G.a,{xsDown:!0},r.a.createElement(Q,{movieData:o,nominations:l,addNomination:i})),r.a.createElement(G.a,{smUp:!0},r.a.createElement(V,{movieData:o,nominations:l,addNomination:i})),r.a.createElement(L.a,{page:c,onChange:m,count:Math.ceil(n/10),className:s.pagination}))}var ee=t(73),ae=t.n(ee),te=t(74),ne=t.n(te);function re(){return r.a.createElement(Y.a,{color:"primary","aria-label":"view source code",href:"https://github.com/nancyyeh/the-shoppies",target:"_blank"},r.a.createElement(ne.a,null))}var ie=Object(p.a)((function(e){return{root:{backgroundColor:"#131316",height:"100vh",maxHeight:1},nominations:{position:"sticky",top:20},header:{color:"#f2c144",fontSize:96}}})),oe=Object(s.a)({palette:{type:"dark",primary:{main:"#f2c144"},secondary:{main:"#11cb5f"},background:{paper:"#15161A"}}});var le=function(){var e=Object(n.useState)(""),a=Object(m.a)(e,2),t=a[0],i=a[1],o=Object(n.useState)([]),s=Object(m.a)(o,2),p=s[0],g=s[1],f=Object(n.useState)(0),b=Object(m.a)(f,2),v=b[0],y=b[1],j=Object(n.useState)(1),O=Object(m.a)(j,2),w=O[0],S=O[1],k=Object(n.useState)(!0),C=Object(m.a)(k,2),x=C[0],D=C[1],I=Object(n.useState)(null),A=Object(m.a)(I,2),P=A[0],z=A[1],R=Object(n.useState)(JSON.parse(localStorage.getItem("nominations")||"{}")),T=Object(m.a)(R,2),W=T[0],B=T[1],Y=ie(),J=function(e){B(e),localStorage.setItem("nominations",JSON.stringify(e))},M=Object(n.useCallback)(ae.a.debounce((function(e){return H(e)}),200),[]),H=function(e,a){var t="https://www.omdbapi.com/?apikey=cbf06e88&s=".concat(e.trim(),"&page=").concat(a,"&type=movie");e.length>2&&fetch(t,{method:"GET"}).then((function(e){return e.json()})).then((function(e){if("True"===e.Response){y(e.totalResults);var a={};e.Search.forEach((function(e){a[e.imdbID]=e})),g(a),D(!1)}else z(e.Error),D(!0)}),(function(e){D(!0),z(e)}))};return r.a.createElement(u.a,{theme:oe},r.a.createElement(E.a,{className:Y.root,display:"flex",flexDirection:"column",justifyContent:"flex-start",textAlign:"center",p:3},r.a.createElement(E.a,{p:2,className:Y.header},r.a.createElement("img",{src:"/the-shoppies/shoppies_logo.png",alt:"The Shoppies",width:"70%"})),r.a.createElement(E.a,{m:2,className:"API-settings",position:"absolute",top:18,right:18},r.a.createElement(re,null)),r.a.createElement(E.a,null,r.a.createElement(d.a,{container:!0,direction:"row-reverse",spacing:3},r.a.createElement(d.a,{item:!0,xs:12,sm:12,md:4},r.a.createElement(h.a,{className:Y.nominations},r.a.createElement(E.a,{p:2},r.a.createElement("h3",null,r.a.createElement("span",{role:"img","aria-label":"throphy"},"\ud83c\udfc6")," ","Nominee (",5-Object.keys(W).length," Remaining)"),r.a.createElement(F,{nominations:W,removeNomination:function(e){var a=Object(c.a)({},W);delete a[e],J(a)},handleResetNominations:function(){J({})},clearSearch:function(){i("")}})))),r.a.createElement(d.a,{item:!0,xs:12,sm:12,md:8},r.a.createElement(h.a,null,r.a.createElement(E.a,{p:2},r.a.createElement(N,{onChange:function(e){var a=e.target.value;i(a),M(a)},value:t}),r.a.createElement(Z,{searchKey:t,isError:x,error:P,numResult:v,addNomination:function(e){var a=p[e];J(Object(c.a)(Object(c.a)({},W),{},Object(l.a)({},e,a)))},movieData:p,nominations:W,page:w,handlePageChange:function(e,a){S(a),H(t,a)}}))))))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(le,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[87,1,2]]]);
//# sourceMappingURL=main.69fbad5c.chunk.js.map