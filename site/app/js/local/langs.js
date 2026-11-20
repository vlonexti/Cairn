const Y="<<xenon:needs-input>>",O="<<xenon:syntax>>",m={cpp:{id:"cpp",name:"C++",monaco:"cpp",fences:["cpp","c++"],exts:["cpp","cc","cxx","h","hpp","hh","hxx","ixx","cppm","inl"],source:/\.(cpp|cc|cxx)$/i,entry:"main.cpp",unitEntry:"solution.cpp",comment:"//",hasMain:e=>/\bint\s+main\s*\(/.test(e)},c:{id:"c",name:"C",monaco:"c",fences:["c","c17","c11"],exts:["c","h"],source:/\.c$/i,entry:"main.c",unitEntry:"solution.c",comment:"//",hasMain:e=>/\bint\s+main\s*\(/.test(e),reads:/\b(scanf|fgets|getchar|getline|fgetc|getc|fread|fscanf)\s*\(/},asm:{id:"asm",name:"Assembly",monaco:"nasm",fences:["nasm","asm","x86asm","assembly"],exts:["asm","inc"],source:/\.asm$/i,entry:"main.asm",unitEntry:"solution.asm",comment:";",hasMain:e=>/^\s*_start\s*:/m.test(e),reads:/\b(read_int|read_char|read_line)\b/},python:{id:"python",name:"Python",monaco:"python",fences:["python","py","python3"],exts:["py"],source:/\.py$/i,entry:"main.py",unitEntry:"solution.py",comment:"#",hasMain:()=>!0,reads:/\binput\s*\(|\bsys\.stdin\b|\bfileinput\b/},lua:{id:"lua",name:"Lua",monaco:"lua",fences:["lua"],exts:["lua"],source:/\.lua$/i,entry:"main.lua",unitEntry:"solution.lua",comment:"--",hasMain:()=>!0,reads:/\bio\s*\.\s*(read|lines\s*\(\s*\)|stdin)\b|\bio\s*\.\s*lines\s*\(\s*\)/},javascript:{id:"javascript",name:"JavaScript",monaco:"javascript",fences:["javascript","js","node","mjs"],exts:["js","mjs","cjs"],source:/\.(js|mjs|cjs)$/i,entry:"main.js",unitEntry:"solution.js",comment:"//",local:!0,hasMain:()=>!0,reads:/\bprompt\s*\(|\breadline\b|process\.stdin|readFileSync\s*\(\s*(0|['"]\/dev\/stdin['"])/},typescript:{id:"typescript",name:"TypeScript",monaco:"typescript",fences:["typescript","ts"],exts:["ts","mts","cts"],source:/\.(ts|mts|cts)$/i,entry:"main.ts",unitEntry:"solution.ts",comment:"//",local:!0,hasMain:()=>!0,reads:/\bprompt\s*\(|\breadline\b|process\.stdin|readFileSync\s*\(\s*(0|['"]\/dev\/stdin['"])/},csharp:{id:"csharp",name:"C#",monaco:"csharp",fences:["csharp","cs","c#"],exts:["cs"],source:/\.cs$/i,entry:"Program.cs",unitEntry:"Solution.cs",comment:"//",hasMain:e=>/\bstatic\s+(async\s+)?(void|int|Task|Task<int>)\s+Main\s*\(/.test(e)||!/^\s*(namespace|(public\s+|internal\s+)?(static\s+|sealed\s+|abstract\s+|partial\s+)*(class|struct|record|interface|enum))\b/m.test(e.replace(/^\s*(using|\/\/|#).*$/gm,""))||/^[^\s/{}][^\n]*;\s*$/m.test(e.replace(/^\s*using .*$/gm,"")),reads:/\bConsole\s*\.\s*(ReadLine|Read|ReadKey|In)\b/},java:{id:"java",name:"Java",monaco:"java",fences:["java"],exts:["java"],source:/\.java$/i,entry:"Main.java",unitEntry:"Solution.java",comment:"//",hasMain:e=>/\bstatic\s+void\s+main\s*\(/.test(e)||/^\s*void\s+main\s*\(\s*\)/m.test(e),reads:/\bSystem\s*\.\s*in\b|\bScanner\b|\bConsole\b|\bBufferedReader\b/},rust:{id:"rust",name:"Rust",monaco:"rust",fences:["rust","rs"],exts:["rs"],source:/\.rs$/i,entry:"main.rs",unitEntry:"solution.rs",comment:"//",hasMain:e=>/\bfn\s+main\s*\(/.test(e),reads:/\bstdin\s*\(|\bio::stdin\b|read_line\s*\(/}},$=new Map;for(const e of Object.values(m))for(const t of e.exts)$.has(t)||$.set(t,e.id);function f(e){const t=/\.([A-Za-z0-9]+)$/.exec(String(e||""));return t&&$.get(t[1].toLowerCase())||null}function H(e,t){const n=Object.keys(e||{});if(t&&m[f(t)]&&m[f(t)].source.test(t))return f(t);const a={};for(const o of n){const s=f(o);s&&m[s].source.test(o)&&(a[s]=(a[s]||0)+1)}if(a.typescript)return"typescript";const r=Object.entries(a).sort((o,s)=>s[1]-o[1])[0];return r?r[0]:"cpp"}function ee(e){const t=String(e||"").toLowerCase();for(const n of Object.values(m))if(n.fences.includes(t))return n.id;return null}function L(e,t){const n=m[e],a=Object.keys(t).filter(o=>n.source.test(o));return a.includes(n.entry)?n.entry:a.find(o=>n.hasMain(t[o]))||a[0]||n.entry}function K(e){return String(e).replace(/\/\*[\s\S]*?\*\//g," ").replace(/(^|[^:])\/\/[^\n]*/g,"$1").replace(/^\s*#(?!include|!).*$/gm,"").replace(/"(?:[^"\\\n]|\\.)*"|'(?:[^'\\\n]|\\.)*'|`(?:[^`\\]|\\.)*`/g,'""')}function te(e,t){const n=m[e];return!n||!n.reads?!1:Object.entries(t).some(([a,r])=>n.source.test(a)&&n.reads.test(K(r)))}function ne(e,t){return e==="rust"||e==="asm"?!1:e==="java"?!!C(t[L("java",t)]||""):!0}const z={python:{id:"python",lang:"python",ce:"python313",ceLang:"python",name:"Python 3.13",detail:"Runs on Compiler Explorer",standard:"Python 3.13"},csharp:{id:"csharp",lang:"csharp",ce:"dotnet90csharpcoreclr",ceLang:"csharp",name:".NET 9 (C# 13)",detail:"Runs on Compiler Explorer",standard:"C# 13, .NET 9"},java:{id:"java",lang:"java",ce:"java2502",ceLang:"java",name:"Java 25",detail:"Runs on Compiler Explorer",standard:"Java 25 (LTS)"},rust:{id:"rust",lang:"rust",ce:"r1990",ceLang:"rust",name:"Rust 1.99",detail:"Runs on Compiler Explorer",standard:"Rust, 2024 edition"},c:{id:"c",lang:"c",ce:"cg152",ceLang:"c",name:"GCC 15.2 (C17)",detail:"Runs on Compiler Explorer",standard:"C17",supportsAsan:!0},lua:{id:"lua",lang:"lua",ce:"lua547",ceLang:"lua",name:"Lua 5.4",detail:"Runs on Compiler Explorer",standard:"Lua 5.4"},asm:{id:"asm",lang:"asm",ce:"nasm301",ceLang:"assembly",name:"NASM 3.01, x86-64 Linux",detail:"Runs on Compiler Explorer, on Linux",standard:"x86-64, Intel syntax"},javascript:{id:"javascript",lang:"javascript",local:!0,name:"JavaScript",detail:"Runs in your browser",standard:"ECMAScript 2024"},typescript:{id:"typescript",lang:"typescript",local:!0,name:"TypeScript",detail:"Runs in your browser",standard:"TypeScript 5"}},X=(e,t)=>!m[e].source.test(t)&&!/^xenon/i.test(t),w=(e,t)=>Object.keys(t).filter(n=>X(e,n)&&f(n)!==e).map(n=>({filename:n,contents:t[n]})),W=e=>e.replace(/[^\n]/g," ");function C(e){const t=/^([ \t]*)(?:(?:public|final|abstract|sealed|non-sealed|static)\s+)*(class|record|enum|interface)\s+(\w+)[^{]*\{/gm;let n;for(;n=t.exec(e);){let a=1,r=t.lastIndex;for(;r<e.length&&a;r++)e[r]==="{"?a++:e[r]==="}"&&a--;const o=e.slice(t.lastIndex,r);if(/\bstatic\s+void\s+main\s*\(/.test(o))return{name:n[3],open:t.lastIndex}}return null}const q=e=>e.replace(/^public(\s+(?:(?:final|abstract|sealed|non-sealed)\s+)*(?:class|interface|enum|record)\b)/gm,"      $1"),B=["System","System.Collections.Generic","System.IO","System.Linq","System.Text","System.Threading","System.Threading.Tasks"];function J(e,t,n){const a=[t,...Object.keys(e).filter(s=>s!==t&&m.csharp.source.test(s)).sort()],r=B.map(s=>`global using ${s};`),o=[];for(const s of a){let c=e[s].replace(/\r\n/g,`
`);s!==t&&(c=c.split(`
`).map(i=>{const l=/^\s*(global\s+)?using\s+(static\s+)?([\w.]+\s*=\s*)?[\w.<>, ]+\s*;\s*$/.exec(i);return!l||/\busing\s*\(/.test(i)?i:(r.push(l[1]?i.trim():"global "+i.trim()),W(i))}).join(`
`)),o.push(`#line 1 "${s}"
${c}${c.endsWith(`
`)?"":`
`}`)}for(const s of n.usings||[])r.push(s);return[...new Set(r)].join(" ")+`
`+o.join("")+(n.tail||"")}function v(e){return Array.isArray(e)?`{${e.map(v).join(", ")}}`:e&&typeof e=="object"?`{${Object.entries(e).map(([t,n])=>`${t} = ${v(n)}`).join(", ")}}`:typeof e=="string"?`"${[...new TextEncoder().encode(e)].map(t=>t>=32&&t<127&&t!==34&&t!==92?String.fromCharCode(t):`\\${String(t).padStart(3,"0")}`).join("")}"`:String(e)}function P(e){const t=[],n=String(e||"").split(/^;; @([A-Za-z_]\w*):(.*)$/m);for(let a=1;a<n.length;a+=3)t.push({name:n[a],needs:n[a+1].trim().split(/\s+/).filter(Boolean),text:n[a+2]});return t}const G=(e,t)=>new RegExp(`^\\s*${t}\\s*:`,"m").test(e);function D(e,t){const n=P(t),a=new Set,r=s=>{const c=n.find(i=>i.name===s);!c||a.has(s)||G(e,s)||(a.add(s),c.needs.forEach(r))};for(const s of n)!s.name.startsWith("xenon_")&&new RegExp(`\\b${s.name}\\b`).test(e.replace(/;[^\n]*/g,""))&&r(s.name);const o=n.filter(s=>a.has(s.name)).map(s=>s.text).join("");return o?`
%line 1+1 xenon_io.asm
        section .text${o}`:""}const h=e=>{const t=[...new TextEncoder().encode(e)];return t.length?t.join(", ")+", 0":"0"};function A(e){return JSON.parse(e.replace(/\\0/g,"\\u0000"))}function M(e){const t=[];let n=0,a=!1,r="";for(let o=0;o<e.length;o++){const s=e[o];if(a){r+=s,s==="\\"?r+=e[++o]||"":s==='"'&&(a=!1);continue}if(s==='"'){a=!0,r+=s;continue}if((s==="["||s==="(")&&n++,(s==="]"||s===")")&&n--,s===","&&n===0){t.push(r.trim()),r="";continue}r+=s}return r.trim()&&t.push(r.trim()),t}function j(e){const t=e.trim();if(/^'(\\?.)'$/.test(t))return String(JSON.parse(`"${t.slice(1,-1)}"`).charCodeAt(0));if(/^-?(0x[0-9a-f_]+|0b[01_]+|\d[\d_]*)$/i.test(t))return t.replace(/_/g,"");throw new Error(`not a number: ${t}`)}function R(e,t){let n=e.trim(),a=!1;if(n.startsWith("@")&&(a=!0,n=n.slice(1).trim()),n.startsWith('"'))return{lea:t,data:`${t}: db ${h(A(n))}`,kind:"str",writable:a};let r=/^buf\((\d+)\)$/.exec(n);if(r)return{lea:t,data:`${t}: times ${Math.max(1,Math.min(4096,+r[1]))} db 0`,kind:"str",writable:!0};if(r=/^(b|q)?\[(.*)\]$/s.exec(n),r){const o=r[2].trim()?M(r[2]).map(j):[],s=r[1]==="b"?1:8;return{lea:t,data:`${t}: ${s===1?"db":"dq"} ${o.length?o.join(", "):"0"}`,kind:"array",width:s,count:o.length,writable:a}}return{imm:j(n)}}function Z(e){const t=["rdi","rsi","rdx","rcx","r8","r9"],n={rbx:"0x5b5b5b5b00000b0b",rbp:"0x5b5b5b5b00000b9b",r12:"0x5b5b5b5b00000c12",r13:"0x5b5b5b5b00000c13",r14:"0x5b5b5b5b00000c14",r15:"0x5b5b5b5b00000c15"},a=[],r=[];let o=-1,s=0;const c=String(e||"").split(`
`),i=()=>{o>=0&&r.push(`        lea     rdi, [rel xt_n${o}]`,"        call    xt_end")};return c.forEach((l,_)=>{const b=l.replace(/;.*$/,"").trim();if(!b)return;const g=_+1;let x=/^test\s+(".*")\s*$/.exec(b);if(x){i(),o++,a.push(`xt_n${o}: db ${h(A(x[1]))}`),r.push(`%line ${g}+0 the-tests`,`        lea     rdi, [rel xt_n${o}]`,"        call    xt_begin");return}if(x=/^([A-Za-z_.][\w.]*)\s*\((.*)\)\s*(==|=>)\s*(.+)$/.exec(b),!x){r.push(`%line ${g}+0 the-tests`,'        %error "a test line must look like  name(arguments) == number  or  name(arguments) => \\"text\\""');return}o<0&&(o++,a.push(`xt_n${o}: db ${h("the tests")}`),r.push("        lea     rdi, [rel xt_n0]","        call    xt_begin"));const p=s++,[,E,S,N,T]=x;a.push(`xt_e${p}: db ${h(`${E}(${S.trim()})`)}`);const y=M(S).map((u,d)=>R(u,`xt_a${p}_${d}`));r.push(`%line ${g}+0 the-tests`,`        lea     rax, [rel xt_e${p}]`,"        mov     [rel xt_expr], rax"),y.forEach((u,d)=>{if(d>=t.length)return r.push('        %error "at most six arguments"');u.data?(a.push(u.data),r.push(`        lea     ${t[d]}, [rel ${u.lea}]`)):r.push(`        mov     ${t[d]}, ${u.imm}`)});for(const[u,d]of Object.entries(n))r.push(`        mov     ${u}, ${d}`);if(r.push(`        call    ${E}`,"        call    xt_saved"),N==="==")r.push(`        mov     r10, ${j(T)}`,"        cmp     rax, r10",`        je      xt_ok${p}`,"        mov     rsi, rax","        mov     rdx, r10","        call    xt_fail_int",`xt_ok${p}:`);else{const u=y.findIndex(F=>F.writable);if(u<0){r.push('        %error "=> compares the memory of an argument marked with @, and this line has none"');return}const d=R(T,`xt_w${p}`);if(!d.data){r.push('        %error "after => comes \\"text\\" or [numbers]"');return}a.push(d.data);const k=y[u];d.kind==="str"?r.push(`        lea     rsi, [rel ${k.lea}]`,`        lea     rdx, [rel ${d.lea}]`,"        call    xt_check_str"):r.push(`        lea     rsi, [rel ${k.lea}]`,`        lea     rdx, [rel ${d.lea}]`,`        mov     ecx, ${d.count}`,`        mov     r8d, ${d.width===1?1:8}`,"        call    xt_check_array")}}),i(),`
%line 1+0 the-tests
        global  _start
        section .data
xt_failed:      dq      0
xt_failures:    dq      0
xt_kind:        dq      0
xt_expr:        dq      0
xt_got:         dq      0
xt_want:        dq      0
xt_count:       dq      0
xt_width:       dq      0
xt_reg:         dq      0
${a.join(`
`)}
xt_sB:  db 'B', 9, 0
xt_sP:  db 'P', 9, 0
xt_sF:  db 'F', 9, 0
xt_sE:  db 'E', 9, 0
xt_sNL: db 10, 0
xt_sTab: db 9, 0
xt_sGave: db ' gave ', 0
xt_sExp: db ', expected ', 0
xt_sChanged: db ' changed ', 0
xt_sKeep: db ' (a function must leave rbx, rbp and r12 to r15 as it found them)', 0
xt_sLeft: db ' left ', 0
xt_sQ:  db '"', 0
xt_sOpen: db '[', 0
xt_sClose: db ']', 0
xt_sComma: db ', ', 0
${Object.keys(n).map(l=>`xt_r_${l}: db '${l}', 0`).join(`
`)}
        section .text
_start:
${r.join(`
`)}
%line 1+0 the-tests
        mov     dword [rel xenon_fd], 2
        lea     rdi, [rel xt_sE]
        call    print_str
        mov     rdi, [rel xt_failures]
        call    print_int
        call    print_newline
        mov     eax, 60
        xor     edi, edi
        syscall
xt_begin:                               ; rdi = the test's name
        push    rdi
        mov     dword [rel xenon_fd], 2
        lea     rdi, [rel xt_sB]
        call    print_str
        pop     rdi
        call    print_str
        call    print_newline
        mov     dword [rel xenon_fd], 1
        mov     qword [rel xt_failed], 0
        ret
xt_end:                                 ; rdi = the test's name
        push    rdi
        mov     dword [rel xenon_fd], 2
        cmp     qword [rel xt_failed], 0
        jne     .failed
        lea     rdi, [rel xt_sP]
        call    print_str
        pop     rdi
        call    print_str
        jmp     .line
.failed:
        inc     qword [rel xt_failures]
        lea     rdi, [rel xt_sF]
        call    print_str
        pop     rdi
        call    print_str
        lea     rdi, [rel xt_sTab]
        call    print_str
        call    xt_report
.line:  call    print_newline
        mov     dword [rel xenon_fd], 1
        ret
${Object.entries(n).map(([l,_])=>`        mov     r10, ${_}
        cmp     ${l}, r10
        jne     xt_saved_${l}`).join(`
`).replace(/^/,`xt_saved:                               ; keeps rax
`)}
        ret
${Object.keys(n).map(l=>`xt_saved_${l}:
        lea     r10, [rel xt_r_${l}]
        jmp     xt_saved_fail`).join(`
`)}
xt_saved_fail:
        cmp     qword [rel xt_failed], 0
        jne     .done
        mov     qword [rel xt_failed], 1
        mov     qword [rel xt_kind], 2
        mov     [rel xt_reg], r10
.done:  ret
xt_fail_int:                            ; rsi = what came back, rdx = what was expected
        cmp     qword [rel xt_failed], 0
        jne     .done
        mov     qword [rel xt_failed], 1
        mov     qword [rel xt_kind], 1
        mov     [rel xt_got], rsi
        mov     [rel xt_want], rdx
.done:  ret
xt_check_str:                           ; rsi = the buffer, rdx = the expected text
        xor     ecx, ecx
.next:  mov     al, [rsi + rcx]
        cmp     al, [rdx + rcx]
        jne     .differ
        test    al, al
        jz      .same
        inc     rcx
        jmp     .next
.differ:
        cmp     qword [rel xt_failed], 0
        jne     .same
        mov     qword [rel xt_failed], 1
        mov     qword [rel xt_kind], 3
        mov     [rel xt_got], rsi
        mov     [rel xt_want], rdx
.same:  ret
xt_check_array:                         ; rsi = the array, rdx = the expected one, ecx = how many, r8d = 1 or 8 bytes each
        xor     r9d, r9d
.next:  cmp     r9, rcx
        jae     .same
        cmp     r8d, 1
        jne     .q
        movzx   eax, byte [rsi + r9]
        movzx   r10d, byte [rdx + r9]
        jmp     .cmp
.q:     mov     rax, [rsi + r9 * 8]
        mov     r10, [rdx + r9 * 8]
.cmp:   cmp     rax, r10
        jne     .differ
        inc     r9
        jmp     .next
.differ:
        cmp     qword [rel xt_failed], 0
        jne     .same
        mov     qword [rel xt_failed], 1
        mov     qword [rel xt_kind], 4
        mov     [rel xt_got], rsi
        mov     [rel xt_want], rdx
        mov     [rel xt_count], rcx
        mov     [rel xt_width], r8
.same:  ret
xt_report:                              ; prints what went wrong in the current test
        push    rbx
        mov     rdi, [rel xt_expr]
        call    print_str
        mov     rax, [rel xt_kind]
        cmp     rax, 2
        je      .saved
        cmp     rax, 3
        je      .str
        cmp     rax, 4
        je      .arr
        lea     rdi, [rel xt_sGave]
        call    print_str
        mov     rdi, [rel xt_got]
        call    print_int
        lea     rdi, [rel xt_sExp]
        call    print_str
        mov     rdi, [rel xt_want]
        call    print_int
        jmp     .done
.saved: lea     rdi, [rel xt_sChanged]
        call    print_str
        mov     rdi, [rel xt_reg]
        call    print_str
        lea     rdi, [rel xt_sKeep]
        call    print_str
        jmp     .done
.str:   lea     rdi, [rel xt_sLeft]
        call    print_str
        lea     rdi, [rel xt_sQ]
        call    print_str
        mov     rdi, [rel xt_got]
        call    print_str
        lea     rdi, [rel xt_sQ]
        call    print_str
        lea     rdi, [rel xt_sExp]
        call    print_str
        lea     rdi, [rel xt_sQ]
        call    print_str
        mov     rdi, [rel xt_want]
        call    print_str
        lea     rdi, [rel xt_sQ]
        call    print_str
        jmp     .done
.arr:   lea     rdi, [rel xt_sLeft]
        call    print_str
        mov     rdi, [rel xt_got]
        call    xt_print_array
        lea     rdi, [rel xt_sExp]
        call    print_str
        mov     rdi, [rel xt_want]
        call    xt_print_array
.done:  pop     rbx
        ret
xt_print_array:                         ; rdi = an array of [xt_count] items of [xt_width] bytes
        push    rbx
        push    r12
        push    r13
        mov     r12, rdi
        xor     ebx, ebx
        lea     rdi, [rel xt_sOpen]
        call    print_str
.next:  cmp     rbx, [rel xt_count]
        jae     .close
        test    rbx, rbx
        jz      .item
        lea     rdi, [rel xt_sComma]
        call    print_str
.item:  cmp     qword [rel xt_width], 1
        jne     .q
        movzx   edi, byte [r12 + rbx]
        jmp     .print
.q:     mov     rdi, [r12 + rbx * 8]
.print: call    print_int
        inc     rbx
        jmp     .next
.close: lea     rdi, [rel xt_sClose]
        call    print_str
        pop     r13
        pop     r12
        pop     rbx
        ret
`}function re(e,t,n,a){const r=n.entry&&t[n.entry]!==void 0?n.entry:L(e,t),o=Object.keys(t).filter(c=>m[e].source.test(c)),s={entry:r,ceLang:z[e].ceLang,userArguments:"",files:[],source:"",testsLine:0,map:{}};if(e==="c"){const c=o.filter(i=>i!==r);return s.userArguments=["-std=c17","-Wall","-Wextra","-Wpedantic","-Wshadow","-Wno-unused-parameter","-fdiagnostics-color=never",...n.mode==="release"?["-O2"]:["-O0","-g"],...n.interactive?["-include","xenon_input_c.h"]:[],...n.asan&&!n.syntaxOnly?["-fsanitize=address,undefined","-fno-omit-frame-pointer"]:[],...n.syntaxOnly?["-fsyntax-only"]:c,"-lm"].join(" "),n.unit?(s.source=`#include "xenon_test_c.h"
#include "${r}"
int main(void)
{
    xenon_start();
#line 1 "the tests"
${n.unit.tests}
    return xenon_finish();
}
`,s.testsLine=1):s.source=`#include "${r}"
`,s.files=[...Object.keys(t).map(i=>({filename:i,contents:t[i]})),{filename:"xenon_test_c.h",contents:a.cTest||""},...n.interactive?[{filename:"xenon_input_c.h",contents:a.cInput||""}]:[]],s}if(e==="asm"){const c=(t[r]||"").replace(/\r\n/g,`
`),i=n.unit?Z(n.unit.tests):"",l=!n.unit&&/^\s*_start\s*:/m.test(c)&&!/^\s*global\s+_start\b/m.test(c);return s.source=`${c}${c.endsWith(`
`)?"":`
`}${l?`%line 1+0 xenon
        global  _start
`:""}${i}${D(c+i,a.asmKit)}`,s.files=[],s.testsLine=n.unit?1:0,s}if(e==="python"){const i={mode:n.unit?"unit":n.syntaxOnly||!n.execute?"check":"run",entry:r,files:o,interactive:!!n.interactive,args:n.args||[],tests:"xenon_tests.py"};return s.source=`${a.python}
import json as _xenon_json
main(_xenon_json.loads(${JSON.stringify(JSON.stringify(i))}))
`,s.files=Object.keys(t).map(l=>({filename:l,contents:t[l]})),n.unit&&s.files.push({filename:"xenon_tests.py",contents:n.unit.tests}),s.alwaysExecute=!0,s}if(e==="lua"){const i={mode:n.unit?"unit":n.syntaxOnly||!n.execute?"check":"run",entry:r,files:o,interactive:!!n.interactive,args:n.args||[],tests:"xenon_tests.lua"};return s.source=`${a.lua}
xenon_main(${v(i)})
`,s.files=Object.keys(t).map(l=>({filename:l,contents:t[l]})),n.unit&&s.files.push({filename:"xenon_tests.lua",contents:n.unit.tests}),s.alwaysExecute=!0,s}if(e==="csharp"){const c={usings:[],tail:""};if(n.unit){c.usings.push("global using static XenonKit;");for(const i of o)for(const l of t[i].matchAll(/^(?:(?:public|internal|static|sealed|abstract|partial|readonly)\s+)*(?:class|struct|record(?:\s+(?:class|struct))?)\s+(\w+)(?!\w|\s*<)/gm))c.usings.push(`global using static ${l[1]};`);c.tail+=`#line hidden
static class XenonTests { public static void Main() {
#line 1 "the tests"
${n.unit.tests}
#line hidden
XenonKit.Finish(); } }
#line hidden
${a.csharpKit}
`}return n.interactive&&(c.tail+=`#line hidden
${a.csharpInput}
`),s.source=J(t,r,c),s.files=w(e,t),s}if(e==="java"){const c=o.map(l=>({filename:l,contents:q(t[l])}));if(n.unit)return s.source=`import java.util.*; import java.util.function.*; import java.util.stream.*; import java.io.*; import java.nio.file.*; import java.time.*; import java.util.concurrent.*; class XenonTests extends XenonKit { public static void main(String[] xenonArgs) { XenonKit.firstLine = 2;
${n.unit.tests}
finish(); } }
`,s.files=[...c,{filename:"XenonKit.java",contents:a.javaKit},...w(e,t)],s.testsLine=1,s;let i=q(t[r]||"");if(n.interactive){const l=C(i);l&&(i=i.slice(0,l.open)+" static { XenonIn.install(); }"+i.slice(l.open))}return s.source=i,s.files=[...c.filter(l=>l.filename!==r),...n.interactive?[{filename:"XenonIn.java",contents:a.javaInput}]:[],...w(e,t)],s}if(e==="rust"){if(s.userArguments="--edition 2024",n.unit){const c=["#![allow(dead_code, unused_imports, unused_variables, unused_mut, unused_macros)]",'include!("xenon_kit.rs");',`include!("${r}");`,"const XENON_FIRST_LINE: u32 = 6;","fn main() { xenon_kit::begin();"];return s.source=`${c.join(`
`)}
${n.unit.tests}
xenon_kit::finish(); }
`,s.files=[...Object.keys(t).map(i=>({filename:i,contents:t[i]})),{filename:"xenon_kit.rs",contents:a.rustKit}],s.testsLine=5,s}return s.source=t[r]||"",s.files=Object.keys(t).filter(c=>c!==r).map(c=>({filename:c,contents:t[c]})),s}throw new Error(`The website cannot build ${e} yet.`)}const Q=e=>String(e||"").replace(/\u001b\[[0-9;]*[A-Za-z]/g,"");function se(e,t,n){let a=Q(t).replace(/\r\n/g,`
`).replace(/\/app\//g,"").replace(/[A-Za-z]:\\[^\s():]*?compiler-explorer-compiler[^\\\s]*\\/g,"");const r=n.testsLine?"the tests":n.entry;return a=a.replace(/\bexample\.(java|rs|cs|py|c|asm)\b/g,r).replace(/<source>/g,r).replace(/\boutput\.s\b/g,r).replace(/\bthe-tests\b/g,"the tests"),e==="asm"&&(a=a.replace(/^\/usr\/bin\/ld: warning: cannot find entry symbol _start.*$/m,"ld: the program has no _start label, so it starts at the first instruction").replace(/^Compiler did not produce an executable\s*$/m,"")),e==="c"&&(a=a.replace(/^In file included from [^\n]*\n/gm,"").replace(/^\s*\|\s*$/gm,"")),e==="lua"&&(a=a.replace(/(^|[\s'"(<])\.\/([\w-]+(?:\/[\w-]+)*\.lua)/gm,"$1$2")),e==="csharp"&&(a=a.replace(/^Program terminated with signal SIGABRT \(6\)\s*$/m,"").replace(/^.*warning CS(0105|8933|8019|7022).*$\n?/gm,"").replace(/^.*error CS8805.*$\n?/gm,"")),e==="rust"&&(a=a.replace(/^note: run with `RUST_BACKTRACE=1`.*$\n?/gm,"")),a.replace(/\n{3,}/g,`

`).trim()}function I(e,t){return e.testsLine&&t.file==="the tests"&&(t.line=Math.max(1,t.line-e.testsLine)),t}function ae(e,t,n){const a=[],r=String(t||"").split(`
`),o=s=>/warn/.test(s)?"warning":/note|help/.test(s)?"note":"error";for(let s=0;s<r.length;s++){const c=r[s];let i;if(e==="python"||e==="lua")i=/^(.+?):(\d+):(\d+): error: (.*)$/.exec(c),i&&a.push({file:i[1],line:+i[2],col:+i[3],severity:"error",code:"",message:i[4]});else if(e==="csharp")i=/^(.*?)\((\d+),(\d+)\):\s*(error|warning)\s+(CS\d+):\s*(.*?)(?:\s*\[.*\.csproj\])?$/.exec(c),i&&a.push({file:i[1].split("/").pop(),line:+i[2],col:+i[3],severity:o(i[4]),code:i[5],message:i[6]});else if(e==="java"){if(i=/^(.*?):(\d+):\s*(error|warning):\s*(.*)$/.exec(c),i){let l=1;r[s+2]!==void 0&&/^\s*\^\s*$/.test(r[s+2])&&(l=r[s+2].indexOf("^")+1),a.push(I(n,{file:i[1].split("/").pop(),line:+i[2],col:l,severity:o(i[3]),code:"",message:i[4]}))}}else if(e==="c")i=/^(.*?):(\d+):(?:(\d+):)?\s*(fatal error|error|warning|note):\s*(.*)$/.exec(c),i?a.push({file:i[1].split("/").pop(),line:+i[2],col:i[3]?+i[3]:1,severity:o(i[4]),code:"",message:i[5]}):(i=/undefined reference to [`'](.+?)'/.exec(c))&&a.push({file:"linker",line:0,col:0,severity:"error",code:"LD",message:`undefined reference to '${i[1]}': a function was declared but never written, or its name is misspelled`});else if(e==="asm")i=/^(.*?):(\d+):\s*(fatal|error|warning):\s*(.*)$/.exec(c),i?a.push({file:i[1].split("/").pop(),line:+i[2],col:1,severity:o(i[3]),code:"",message:i[4].replace(/\s*\[-w\+[\w-]+\]$/,"")}):(i=/undefined reference to [`'](.+?)'/.exec(c))&&a.push({file:"linker",line:0,col:0,severity:"error",code:"LD",message:`undefined reference to '${i[1]}': there is no label called ${i[1]}`});else if(e==="rust"&&(i=/^(error|warning)(?:\[(E\d+)\])?:\s*(.*)$/.exec(c),i&&!/^(aborting due to|could not compile|\d+ warnings? emitted|function `main` is never used)/.test(i[3]))){const l=/-->\s*(.*?):(\d+):(\d+)/.exec(r[s+1]||"");l?a.push(I(n,{file:l[1].split("/").pop(),line:+l[2],col:+l[3],severity:o(i[1]),code:i[2]||"",message:i[3]})):i[1]==="error"&&!/^(aborting|could not)/.test(i[3])&&a.push({file:n.entry,line:0,col:0,severity:"error",code:i[2]||"",message:i[3]})}}return a}function ie(e){const t=e.indexOf(O);return t<0?null:e.slice(t+O.length).trim()}function oe(e,t,n){const a=String(n||"");if(e==="python"){const r=/(\w+(?:Error|Exception|Interrupt|Exit)):?\s*(.*)\s*$/.exec(a.trim().split(`
`).pop()||"");if(r)return V(r[1],r[2])}if(e==="csharp"){const r=/Unhandled exception\.\s*([\w.]+):\s*(.*)/.exec(a);if(r)return`The program stopped with an exception nothing caught: ${r[1].split(".").pop()} (${r[2].trim()}). The lines under it say where.`}if(e==="java"){const r=/Exception in thread "main" ([\w.$]+)(?::\s*(.*))?/.exec(a);if(r)return`The program stopped with an exception nothing caught: ${r[1].split(".").pop()}${r[2]?` (${r[2].trim()})`:""}. The "at" lines under it say where, newest call first.`}if(e==="rust"){const r=/panicked at (.*?):\s*\n?(.*)/.exec(a);if(r)return`The program panicked (stopped on purpose because something was wrong): ${r[2].trim()} at ${r[1]}.`;if(t===101)return"The program panicked. The message above says why and where."}if(e==="lua"){const r=/^lua: (?:([\w./-]+\.lua|the tests):(\d+): )?(.*)$/m.exec(a);if(r)return U(r[3],r[1],r[2])}if(e==="c"||e==="asm"){if(t===139||/segmentation fault/i.test(a))return"The program crashed: it read or wrote memory it may not touch (a bad pointer or address, or past the end of an array).";if(t===136)return"The program crashed: a whole number was divided by zero.";if(t===134)return"The program stopped: abort() was called, often by a failed assert."}return t!==0?`The program ended with exit code ${t}.`:null}function U(e,t,n){const a=t?` at ${t} line ${n}`:"",r=[[/attempt to index a nil value(?: \((\w+) '([^']+)'\))?/,o=>`something was used as a table but is nil${o[2]?` (${o[1]} '${o[2]}')`:""}: a name that was never set, a misspelled field, or a function that returned nothing`],[/attempt to call a nil value(?: \((\w+) '([^']+)'\))?/,o=>`a function was called that does not exist${o[2]?` (${o[1]} '${o[2]}')`:""}: a typo, or it is defined further down than where it is used`],[/attempt to perform arithmetic on a (\w+) value/,o=>`maths was done with a ${o[1]} value, where a number was needed`],[/attempt to concatenate a (\w+) value/,o=>`.. joined a ${o[1]} value onto text; only strings and numbers can be joined (use tostring)`],[/attempt to compare/,()=>"two values that cannot be compared were compared with < or >, such as a number and a string"],[/stack overflow/,()=>"a function called itself too many times without stopping"],[/bad argument #(\d+) to '([^']+)'/,o=>`${o[2]} was given an unusable argument (number ${o[1]})`]];for(const[o,s]of r){const c=o.exec(e);if(c)return`The program stopped with an error${a}: ${s(c)}. The traceback under it shows the calls that led there, newest first.`}return`The program stopped with an error${a}: ${e.trim()}. The traceback under it shows the calls that led there, newest first.`}function V(e,t){const n={NameError:"a name was used that does not exist (a typo, or a variable used before it was made)",TypeError:"a value of the wrong type was used, such as adding text to a number",ValueError:'a value had the right type but an unusable content, such as int("abc")',IndexError:"an index was past the end of a list or string",KeyError:"a dictionary was asked for a key it does not have",ZeroDivisionError:"a number was divided by zero",AttributeError:"something was asked for an attribute or method it does not have",EOFError:"the program asked for input and there was none left",RecursionError:"a function called itself too many times without stopping",FileNotFoundError:"a file was opened that does not exist",ModuleNotFoundError:"an import named a module that is not installed here",IndentationError:"the indentation of a line is wrong"}[e];return`The program stopped with ${e}${n?`: ${n}`:""}${t?` (${t.trim()})`:""}. The traceback above shows the line, last call at the bottom.`}export{m as LANGS,Y as NEEDS_INPUT,z as REMOTE,Z as asmHarness,ne as canStepInput,K as codeOnly,oe as describeEnd,ae as diagnostics,L as entryOf,ee as langOfFence,f as langOfFile,H as langOfFiles,re as prepare,ie as pythonVerdict,te as readsInput,se as tidyText};
