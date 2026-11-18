var mt=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof require<"u"?require:t)[r]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var za=Object.defineProperty,ym=Object.getOwnPropertyDescriptor,bm=Object.getOwnPropertyNames,$m=Object.prototype.hasOwnProperty,wm=(e=>typeof mt<"u"?mt:typeof Proxy<"u"?new Proxy(e,{get:(t,r)=>(typeof mt<"u"?mt:t)[r]}):e)(function(e){if(typeof mt<"u")return mt.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),P=(e,t)=>()=>(e&&(t=e(e=0)),t),Nt=(e,t)=>{for(var r in t)za(e,r,{get:t[r],enumerable:!0})},vm=(e,t,r,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of bm(t))!$m.call(e,a)&&a!==r&&za(e,a,{get:()=>t[a],enumerable:!(i=ym(t,a))||i.enumerable});return e},ar=e=>vm(za({},"__esModule",{value:!0}),e),Vt,lt,Ot,ks,ad,nd=P(()=>{"use strict";Vt=new Map,lt=[],Ot=(e,t,r)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let i=Vt.get(e);if(i===void 0)Vt.set(e,{backend:t,priority:r});else{if(i.priority>r)return;if(i.priority===r&&i.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${r}`)}if(r>=0){let a=lt.indexOf(e);a!==-1&&lt.splice(a,1);for(let n=0;n<lt.length;n++)if(Vt.get(lt[n]).priority<=r){lt.splice(n,0,e);return}lt.push(e)}return}throw new TypeError("not a valid backend")},ks=async e=>{let t=Vt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let r=!!t.initPromise;try{return r||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(i){return r||(t.error=`${i}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},ad=async e=>{let t=e.executionProviders||[],r=t.map(l=>typeof l=="string"?l:l.name),i=r.length===0?lt:r,a,n=[],s=new Set;for(let l of i){let d=await ks(l);typeof d=="string"?n.push({name:l,err:d}):(a||(a=d),a===d&&s.add(l))}if(!a)throw new Error(`no available backend found. ERR: ${n.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:d}of n)r.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${d}`);let u=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[a,new Proxy(e,{get:(l,d)=>d==="executionProviders"?u:Reflect.get(l,d)})]}}),xm=P(()=>{"use strict";nd()}),sd,Sm=P(()=>{"use strict";sd="1.22.0-dev.20250409-89f8206ba4"}),hi,Ne,od=P(()=>{"use strict";Sm(),hi="warning",Ne={wasm:{},webgl:{},webgpu:{},versions:{common:sd},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);hi=e}},get logLevel(){return hi}},Object.defineProperty(Ne,"logLevel",{enumerable:!0})}),me,km=P(()=>{"use strict";od(),me=Ne}),ud,ld,Tm=P(()=>{"use strict";ud=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);r.width=e.dims[3],r.height=e.dims[2];let i=r.getContext("2d");if(i!=null){let a,n;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[3]):(a=e.dims[3],n=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",u=t?.norm,l,d;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?d=[0,0,0,0]:typeof u.bias=="number"?d=[u.bias,u.bias,u.bias,u.bias]:(d=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(d[3]=u.bias[3]));let c=n*a,f=0,m=c,_=c*2,g=-1;s==="RGBA"?(f=0,m=c,_=c*2,g=c*3):s==="RGB"?(f=0,m=c,_=c*2):s==="RBG"&&(f=0,_=c,m=c*2);for(let $=0;$<n;$++)for(let x=0;x<a;x++){let v=(e.data[f++]-d[0])*l[0],b=(e.data[m++]-d[1])*l[1],k=(e.data[_++]-d[2])*l[2],S=g===-1?255:(e.data[g++]-d[3])*l[3];i.fillStyle="rgba("+v+","+b+","+k+","+S+")",i.fillRect(x,$,1,1)}if("toDataURL"in r)return r.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},ld=(e,t)=>{let r=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),i;if(r!=null){let a,n,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[1],s=e.dims[3]):(a=e.dims[3],n=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,d,c;l===void 0||l.mean===void 0?d=[255,255,255,255]:typeof l.mean=="number"?d=[l.mean,l.mean,l.mean,l.mean]:(d=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(d[3]=l.mean[3])),l===void 0||l.bias===void 0?c=[0,0,0,0]:typeof l.bias=="number"?c=[l.bias,l.bias,l.bias,l.bias]:(c=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(c[3]=l.bias[3]));let f=n*a;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,_=0,g=1,$=2,x=3,v=0,b=f,k=f*2,S=-1;u==="RGBA"?(v=0,b=f,k=f*2,S=f*3):u==="RGB"?(v=0,b=f,k=f*2):u==="RBG"&&(v=0,k=f,b=f*2),i=r.createImageData(a,n);for(let T=0;T<n*a;_+=m,g+=m,$+=m,x+=m,T++)i.data[_]=(e.data[v++]-c[0])*d[0],i.data[g]=(e.data[b++]-c[1])*d[1],i.data[$]=(e.data[k++]-c[2])*d[2],i.data[x]=S===-1?255:(e.data[S++]-c[3])*d[3]}else throw new Error("Can not access image data");return i}}),$r,dd,pd,cd,fd,hd,Im=P(()=>{"use strict";Ca(),$r=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:r,width:i}=t,a=t.norm??{mean:255,bias:0},n,s;typeof a.mean=="number"?n=[a.mean,a.mean,a.mean,a.mean]:n=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?s=[a.bias,a.bias,a.bias,a.bias]:s=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",d=r*i,c=l==="RGBA"?new Float32Array(d*4):new Float32Array(d*3),f=4,m=0,_=1,g=2,$=3,x=0,v=d,b=d*2,k=-1;u==="RGB"&&(f=3,m=0,_=1,g=2,$=-1),l==="RGBA"?k=d*3:l==="RBG"?(x=0,b=d,v=d*2):l==="BGR"&&(b=0,v=d,x=d*2);for(let S=0;S<d;S++,m+=f,g+=f,_+=f,$+=f)c[x++]=(e[m]+s[0])/n[0],c[v++]=(e[_]+s[1])/n[1],c[b++]=(e[g]+s[2])/n[2],k!==-1&&$!==-1&&(c[k++]=(e[$]+s[3])/n[3]);return l==="RGBA"?new Oe("float32",c,[1,4,r,i]):new Oe("float32",c,[1,3,r,i])},dd=async(e,t)=>{let r=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,i=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,n=typeof e=="string",s,u=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},d=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(r){let c=l();c.width=e.width,c.height=e.height;let f=d(c);if(f!=null){let m=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(m=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=m,u.width=_}else u.tensorFormat="RGBA",u.height=m,u.width=_;f.drawImage(e,0,0),s=f.getImageData(0,0,_,m).data}else throw new Error("Can not access image data")}else if(i){let c,f;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,f=t.resizedWidth):(c=e.height,f=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=c,u.width=f,t!==void 0){let m=l();m.width=f,m.height=c;let _=d(m);if(_!=null)_.putImageData(e,0,0),s=_.getImageData(0,0,f,c).data;else throw new Error("Can not access image data")}else s=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=l();c.width=e.width,c.height=e.height;let f=d(c);if(f!=null){let m=e.height,_=e.width;return f.drawImage(e,0,0,_,m),s=f.getImageData(0,0,_,m).data,u.height=m,u.width=_,$r(s,u)}else throw new Error("Can not access image data")}else{if(n)return new Promise((c,f)=>{let m=l(),_=d(m);if(!e||!_)return f();let g=new Image;g.crossOrigin="Anonymous",g.src=e,g.onload=()=>{m.width=g.width,m.height=g.height,_.drawImage(g,0,0,m.width,m.height);let $=_.getImageData(0,0,m.width,m.height);u.height=m.height,u.width=m.width,c($r($.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return $r(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},pd=(e,t)=>{let{width:r,height:i,download:a,dispose:n}=t,s=[1,i,r,4];return new Oe({location:"texture",type:"float32",texture:e,dims:s,download:a,dispose:n})},cd=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new Oe({location:"gpu-buffer",type:r??"float32",gpuBuffer:e,dims:i,download:a,dispose:n})},fd=(e,t)=>{let{dataType:r,dims:i,download:a,dispose:n}=t;return new Oe({location:"ml-tensor",type:r??"float32",mlTensor:e,dims:i,download:a,dispose:n})},hd=(e,t,r)=>new Oe({location:"cpu-pinned",type:e,data:t,dims:r??[t.length]})}),$t,Jt,mi,md,Em=P(()=>{"use strict";$t=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),Jt=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),mi=!1,md=()=>{if(!mi){mi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,r=globalThis.Float16Array,i=typeof r<"u"&&r.from;e&&($t.set("int64",BigInt64Array),Jt.set(BigInt64Array,"int64")),t&&($t.set("uint64",BigUint64Array),Jt.set(BigUint64Array,"uint64")),i?($t.set("float16",r),Jt.set(r,"float16")):$t.set("float16",Uint16Array)}}}),gd,_d,zm=P(()=>{"use strict";Ca(),gd=e=>{let t=1;for(let r=0;r<e.length;r++){let i=e[r];if(typeof i!="number"||!Number.isSafeInteger(i))throw new TypeError(`dims[${r}] must be an integer, got: ${i}`);if(i<0)throw new RangeError(`dims[${r}] must be a non-negative integer, got: ${i}`);t*=i}return t},_d=(e,t)=>{switch(e.location){case"cpu":return new Oe(e.type,e.data,t);case"cpu-pinned":return new Oe({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Oe({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Oe({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Oe({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Oe,Ca=P(()=>{"use strict";Tm(),Im(),Em(),zm(),Oe=class{constructor(e,t,r){md();let i,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,i=e.type,a=e.dims,e.location){case"cpu-pinned":{let s=$t.get(i);if(!s)throw new TypeError(`unsupported type "${i}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(i!=="float32")throw new TypeError(`unsupported type "${i}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(i!=="float32"&&i!=="float16"&&i!=="int32"&&i!=="int64"&&i!=="uint32"&&i!=="uint64"&&i!=="int8"&&i!=="uint8"&&i!=="bool"&&i!=="uint4"&&i!=="int4")throw new TypeError(`unsupported type "${i}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(i=e,u=r,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let l=$t.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(t,BigInt):s=l.from(t)}else if(t instanceof l)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${i} tensor's data must be type of ${l}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")i="string",s=e;else if(l==="boolean")i="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)i="uint8",s=Uint8Array.from(e);else{let l=Jt.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);i=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");a=u,this.cpuData=s,this.dataLocation="cpu"}let n=gd(a);if(this.cpuData&&n!==this.cpuData.length&&!((i==="uint4"||i==="int4")&&Math.ceil(n/2)===this.cpuData.length))throw new Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);this.type=i,this.dims=a,this.size=n}static async fromImage(e,t){return dd(e,t)}static fromTexture(e,t){return pd(e,t)}static fromGpuBuffer(e,t){return cd(e,t)}static fromMLTensor(e,t){return fd(e,t)}static fromPinnedBuffer(e,t,r){return hd(e,t,r)}toDataURL(e){return ud(this,e)}toImageData(e){return ld(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return _d(this,e)}}}),xe,yd=P(()=>{"use strict";Ca(),xe=Oe}),Nr,gi,Xe,je,bd=P(()=>{"use strict";od(),Nr=(e,t)=>{(typeof Ne.trace>"u"?!Ne.wasm.trace:!Ne.trace)||console.timeStamp(`${e}::ORT::${t}`)},gi=(e,t)=>{let r=new Error().stack?.split(/\r\n|\r|\n/g)||[],i=!1;for(let a=0;a<r.length;a++){if(i&&!r[a].includes("TRACE_FUNC")){let n=`FUNC_${e}::${r[a].trim().split(" ")[1]}`;t&&(n+=`::${t}`),Nr("CPU",n);return}r[a].includes("TRACE_FUNC")&&(i=!0)}},Xe=e=>{(typeof Ne.trace>"u"?!Ne.wasm.trace:!Ne.trace)||gi("BEGIN",e)},je=e=>{(typeof Ne.trace>"u"?!Ne.wasm.trace:!Ne.trace)||gi("END",e)}}),$d,Cm=P(()=>{"use strict";nd(),yd(),bd(),$d=class wd{constructor(t){this.handler=t}async run(t,r,i){Xe();let a={},n={};if(typeof t!="object"||t===null||t instanceof xe||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof r=="object"){if(r===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(r instanceof xe)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(r)){if(r.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let d of r){if(typeof d!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(d)===-1)throw new RangeError(`'fetches' contains invalid output name: ${d}.`);a[d]=null}if(typeof i=="object"&&i!==null)n=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else{let d=!1,c=Object.getOwnPropertyNames(r);for(let f of this.outputNames)if(c.indexOf(f)!==-1){let m=r[f];(m===null||m instanceof xe)&&(d=!0,s=!1,a[f]=m)}if(d){if(typeof i=="object"&&i!==null)n=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else n=r}}else if(typeof r<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let d of this.inputNames)if(typeof t[d]>"u")throw new Error(`input '${d}' is missing in 'feeds'.`);if(s)for(let d of this.outputNames)a[d]=null;let u=await this.handler.run(t,a,n),l={};for(let d in u)if(Object.hasOwnProperty.call(u,d)){let c=u[d];c instanceof xe?l[d]=c:l[d]=new xe(c.type,c.data,c.dims)}return je(),l}async release(){return this.handler.dispose()}static async create(t,r,i,a){Xe();let n,s={};if(typeof t=="string"){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(n=t,typeof r=="object"&&r!==null)s=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,f=0,m=t.byteLength;if(typeof r=="object"&&r!==null)s=r;else if(typeof r=="number"){if(f=r,!Number.isSafeInteger(f))throw new RangeError("'byteOffset' must be an integer.");if(f<0||f>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(m=t.byteLength-f,typeof i=="number"){if(m=i,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||f+m>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-f}].`);if(typeof a=="object"&&a!==null)s=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof i<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof r<"u")throw new TypeError("'options' must be an object.");n=new Uint8Array(c,f,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await ad(s),d=await u.createInferenceSessionHandler(n,l);return je(),new wd(d)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),jr,Am=P(()=>{"use strict";Cm(),jr=$d}),Om=P(()=>{"use strict"}),Rm=P(()=>{"use strict"}),Bm=P(()=>{"use strict"}),Mm=P(()=>{"use strict"}),Nm={};Nt(Nm,{InferenceSession:()=>jr,TRACE:()=>Nr,TRACE_FUNC_BEGIN:()=>Xe,TRACE_FUNC_END:()=>je,Tensor:()=>xe,env:()=>me,registerBackend:()=>Ot});var Ge=P(()=>{"use strict";xm(),km(),Am(),yd(),Om(),Rm(),bd(),Bm(),Mm()}),Aa=P(()=>{"use strict"}),vd={};Nt(vd,{default:()=>xd});var _i,yi,xd,Dm=P(()=>{"use strict";zf(),kt(),Oa(),_i="ort-wasm-proxy-worker",yi=globalThis.self?.name===_i,yi&&(self.onmessage=e=>{let{type:t,in:r}=e.data;try{switch(t){case"init-wasm":Ra(r.wasm).then(()=>{Xa(r).then(()=>{postMessage({type:t})},i=>{postMessage({type:t,err:i})})},i=>{postMessage({type:t,err:i})});break;case"init-ep":{let{epName:i,env:a}=r;Ya(a,i).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})});break}case"copy-from":{let{buffer:i}=r,a=Vr(i);postMessage({type:t,out:a});break}case"create":{let{model:i,options:a}=r;Ja(i,a).then(n=>{postMessage({type:t,out:n})},n=>{postMessage({type:t,err:n})});break}case"release":en(r),postMessage({type:t});break;case"run":{let{sessionId:i,inputIndices:a,inputs:n,outputIndices:s,options:u}=r;tn(i,a,n,s,new Array(s.length).fill(null),u).then(l=>{l.some(d=>d[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},an([...n,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":rn(r),postMessage({type:t});break;default:}}catch(i){postMessage({type:t,err:i})}}),xd=yi?null:e=>new Worker(e??Ae,{type:"module",name:_i})}),Sd={};Nt(Sd,{default:()=>kd});var bi,$i,kd,Ts,Pm=P(()=>{"use strict";$i=(bi=import.meta.url,async function(e={}){var t,r,i=e,a=new Promise((o,p)=>{t=o,r=p}),n=typeof window=="object",s=typeof WorkerGlobalScope<"u",u=s&&self.name?.startsWith("em-pthread");i.mountExternalData=(o,p)=>{o.startsWith("./")&&(o=o.substring(2)),(i.Eb||(i.Eb=new Map)).set(o,p)},i.unmountExternalData=()=>{delete i.Eb};var l=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,pc:!0}).buffer.constructor;let d=o=>async(...p)=>{try{if(i.Fb)throw Error("Session already started");let h=i.Fb={dc:p[0],errors:[]},y=await o(...p);if(i.Fb!==h)throw Error("Session mismatch");i.Jb?.flush();let w=h.errors;if(0<w.length){let I=await Promise.all(w);if(I=I.filter(O=>O),0<I.length)throw Error(I.join(`
`))}return y}finally{i.Fb=null}};i.jsepInit=(o,p)=>{if(o==="webgpu"){[i.Jb,i.Ub,i.Yb,i.Kb,i.Xb,i.jb,i.Zb,i.ac,i.Vb,i.Wb,i.$b]=p;let h=i.Jb;i.jsepRegisterBuffer=(y,w,I,O)=>h.registerBuffer(y,w,I,O),i.jsepGetBuffer=y=>h.getBuffer(y),i.jsepCreateDownloader=(y,w,I)=>h.createDownloader(y,w,I),i.jsepOnCreateSession=y=>{h.onCreateSession(y)},i.jsepOnReleaseSession=y=>{h.onReleaseSession(y)},i.jsepOnRunStart=y=>h.onRunStart(y),i.bc=(y,w)=>{h.upload(y,w)}}else if(o==="webnn"){let h=p[0];[i.nc,i.Nb,i.webnnEnsureTensor,i.Ob,i.webnnDownloadTensor]=p.slice(1),i.webnnReleaseTensorId=i.Nb,i.webnnUploadTensor=i.Ob,i.webnnOnRunStart=y=>h.onRunStart(y),i.webnnOnRunEnd=h.onRunEnd.bind(h),i.webnnRegisterMLContext=(y,w)=>{h.registerMLContext(y,w)},i.webnnOnReleaseSession=y=>{h.onReleaseSession(y)},i.webnnCreateMLTensorDownloader=(y,w)=>h.createMLTensorDownloader(y,w),i.webnnRegisterMLTensor=(y,w,I,O)=>h.registerMLTensor(y,w,I,O),i.webnnCreateMLContext=y=>h.createMLContext(y),i.webnnRegisterMLConstant=(y,w,I,O,D,q)=>h.registerMLConstant(y,w,I,O,D,i.Eb,q),i.webnnRegisterGraphInput=h.registerGraphInput.bind(h),i.webnnIsGraphInput=h.isGraphInput.bind(h),i.webnnCreateTemporaryTensor=h.createTemporaryTensor.bind(h),i.webnnIsInt64Supported=h.isInt64Supported.bind(h)}};let c=()=>{let o=(p,h,y)=>(...w)=>{let I=Ke,O=h?.();w=p(...w);let D=h?.();return O!==D&&(p=D,y(O),h=y=null),Ke!=I?new Promise((q,H)=>{si={resolve:q,reject:H}}):w};(()=>{for(let p of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])i[p]=o(i[p],()=>i[p],h=>i[p]=h)})(),d!==void 0&&(i._OrtRun=d(i._OrtRun),i._OrtRunWithBinding=d(i._OrtRunWithBinding)),c=void 0};i.asyncInit=()=>{c?.()};var f,m,_=Object.assign({},i),g=(o,p)=>{throw p},$="";(n||s)&&(s?$=self.location.href:typeof document<"u"&&document.currentScript&&($=document.currentScript.src),bi&&($=bi),$=$.startsWith("blob:")?"":$.slice(0,$.replace(/[?#].*/,"").lastIndexOf("/")+1),s&&(m=o=>{var p=new XMLHttpRequest;return p.open("GET",o,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),f=async o=>{if(X(o))return new Promise((h,y)=>{var w=new XMLHttpRequest;w.open("GET",o,!0),w.responseType="arraybuffer",w.onload=()=>{w.status==200||w.status==0&&w.response?h(w.response):y(w.status)},w.onerror=y,w.send(null)});var p=await fetch(o,{credentials:"same-origin"});if(p.ok)return p.arrayBuffer();throw Error(p.status+" : "+p.url)});var x=console.log.bind(console),v=console.error.bind(console),b=x,k=v;Object.assign(i,_),_=null;var S,T,E,z,B,N,V,Q,F,U,ee,oe,L,Y=i.wasmBinary,re=!1,X=o=>o.startsWith("file://");function fe(){return S.buffer!=z.buffer&&ze(),z}function M(){return S.buffer!=z.buffer&&ze(),B}function W(){return S.buffer!=z.buffer&&ze(),N}function te(){return S.buffer!=z.buffer&&ze(),V}function A(){return S.buffer!=z.buffer&&ze(),Q}function ae(){return S.buffer!=z.buffer&&ze(),F}function De(){return S.buffer!=z.buffer&&ze(),U}function be(){return S.buffer!=z.buffer&&ze(),L}if(u){let o=function(p){try{var h=p.data,y=h.Bb;if(y==="load"){let w=[];self.onmessage=I=>w.push(I),self.startWorker=()=>{postMessage({Bb:"loaded"});for(let I of w)o(I);self.onmessage=o};for(let I of h.Rb)i[I]&&!i[I].proxy||(i[I]=(...O)=>{postMessage({Bb:"callHandler",Qb:I,args:O})},I=="print"&&(b=i[I]),I=="printErr"&&(k=i[I]));S=h.kc,ze(),He(h.lc)}else if(y==="run"){Jf(h.Ab),di(h.Ab,0,0,1,0,0),bn(),ai(h.Ab),Pt||(fs(),Pt=!0);try{eh(h.fc,h.Hb)}catch(w){if(w!="unwind")throw w}}else h.target!=="setimmediate"&&(y==="checkMailbox"?Pt&&lr():y&&(k(`worker: received unknown command ${y}`),k(h)))}catch(w){throw hs(),w}};var ve=o,He,Pt=!1;k=function(...p){p=p.join(" "),console.error(p)},self.alert=function(...p){postMessage({Bb:"alert",text:p.join(" "),ic:_r()})},self.onunhandledrejection=p=>{throw p.reason||p},self.onmessage=o}function ze(){var o=S.buffer;i.HEAP8=z=new Int8Array(o),i.HEAP16=N=new Int16Array(o),i.HEAPU8=B=new Uint8Array(o),i.HEAPU16=V=new Uint16Array(o),i.HEAP32=Q=new Int32Array(o),i.HEAPU32=F=new Uint32Array(o),i.HEAPF32=U=new Float32Array(o),i.HEAPF64=L=new Float64Array(o),i.HEAP64=ee=new BigInt64Array(o),i.HEAPU64=oe=new BigUint64Array(o)}function pn(){u?startWorker(i):Z.Ca()}u||(S=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),ze());var Hr,Ut=0,qt=null;function cn(){if(--Ut==0&&qt){var o=qt;qt=null,o()}}function it(o){throw k(o="Aborted("+o+")"),re=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),r(o),o}function fn(){return{a:{L:Yf,Aa:Xf,b:rh,$:xn,A:Tn,pa:In,X:zn,Z:Cn,qa:An,na:On,ga:Rn,ma:Bn,J:Mn,Y:Nn,V:Dn,oa:Pn,W:Un,va:ih,E:nh,Q:sh,O:uh,D:dh,u:ph,r:ch,P:fh,z:$h,R:wh,ja:vh,T:xh,aa:Sh,M:kh,F:Th,ia:ai,sa:Ih,t:Eh,Ba:zh,w:Oh,o:Rh,l:Mh,c:ti,n:Nh,j:Uh,v:qh,p:Wh,f:Lh,s:Vh,m:jh,e:Gh,k:Hh,i:Fh,g:Kh,d:Zh,da:Qh,ea:Xh,fa:Yh,ba:Jn,ca:es,N:ts,xa:em,ua:im,h:am,C:nm,G:sm,ta:tm,x:om,ra:um,U:lm,q:Jh,y:dm,K:pm,S:cm,za:fm,ya:hm,ka:ns,la:ss,_:Xr,B:os,I:us,ha:ls,H:ds,a:S,wa:Qr}}}var Fr={829644:(o,p,h,y,w)=>{if(i===void 0||!i.Eb)return 1;if((o=we(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=i.Eb.get(o)))return 2;if(p=Number(p>>>0),h=Number(h>>>0),y=Number(y>>>0),p+h>o.byteLength)return 3;try{let I=o.subarray(p,p+h);switch(w){case 0:M().set(I,y>>>0);break;case 1:i.mc?i.mc(y,I):i.bc(y,I);break;default:return 4}return 0}catch{return 4}},830468:(o,p,h)=>{i.Ob(o,M().subarray(p>>>0,p+h>>>0))},830532:()=>i.nc(),830574:o=>{i.Nb(o)},830611:()=>{i.Vb()},830642:()=>{i.Wb()},830671:()=>{i.$b()},830696:o=>i.Ub(o),830729:o=>i.Yb(o),830761:(o,p,h)=>{i.Kb(Number(o),Number(p),Number(h),!0)},830824:(o,p,h)=>{i.Kb(Number(o),Number(p),Number(h))},830881:()=>typeof wasmOffsetConverter<"u",830938:o=>{i.jb("Abs",o,void 0)},830989:o=>{i.jb("Neg",o,void 0)},831040:o=>{i.jb("Floor",o,void 0)},831093:o=>{i.jb("Ceil",o,void 0)},831145:o=>{i.jb("Reciprocal",o,void 0)},831203:o=>{i.jb("Sqrt",o,void 0)},831255:o=>{i.jb("Exp",o,void 0)},831306:o=>{i.jb("Erf",o,void 0)},831357:o=>{i.jb("Sigmoid",o,void 0)},831412:(o,p,h)=>{i.jb("HardSigmoid",o,{alpha:p,beta:h})},831491:o=>{i.jb("Log",o,void 0)},831542:o=>{i.jb("Sin",o,void 0)},831593:o=>{i.jb("Cos",o,void 0)},831644:o=>{i.jb("Tan",o,void 0)},831695:o=>{i.jb("Asin",o,void 0)},831747:o=>{i.jb("Acos",o,void 0)},831799:o=>{i.jb("Atan",o,void 0)},831851:o=>{i.jb("Sinh",o,void 0)},831903:o=>{i.jb("Cosh",o,void 0)},831955:o=>{i.jb("Asinh",o,void 0)},832008:o=>{i.jb("Acosh",o,void 0)},832061:o=>{i.jb("Atanh",o,void 0)},832114:o=>{i.jb("Tanh",o,void 0)},832166:o=>{i.jb("Not",o,void 0)},832217:(o,p,h)=>{i.jb("Clip",o,{min:p,max:h})},832286:o=>{i.jb("Clip",o,void 0)},832338:(o,p)=>{i.jb("Elu",o,{alpha:p})},832396:o=>{i.jb("Gelu",o,void 0)},832448:o=>{i.jb("Relu",o,void 0)},832500:(o,p)=>{i.jb("LeakyRelu",o,{alpha:p})},832564:(o,p)=>{i.jb("ThresholdedRelu",o,{alpha:p})},832634:(o,p)=>{i.jb("Cast",o,{to:p})},832692:o=>{i.jb("Add",o,void 0)},832743:o=>{i.jb("Sub",o,void 0)},832794:o=>{i.jb("Mul",o,void 0)},832845:o=>{i.jb("Div",o,void 0)},832896:o=>{i.jb("Pow",o,void 0)},832947:o=>{i.jb("Equal",o,void 0)},833e3:o=>{i.jb("Greater",o,void 0)},833055:o=>{i.jb("GreaterOrEqual",o,void 0)},833117:o=>{i.jb("Less",o,void 0)},833169:o=>{i.jb("LessOrEqual",o,void 0)},833228:(o,p,h,y,w)=>{i.jb("ReduceMean",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(A().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},833403:(o,p,h,y,w)=>{i.jb("ReduceMax",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(A().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},833577:(o,p,h,y,w)=>{i.jb("ReduceMin",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(A().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},833751:(o,p,h,y,w)=>{i.jb("ReduceProd",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(A().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},833926:(o,p,h,y,w)=>{i.jb("ReduceSum",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(A().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},834100:(o,p,h,y,w)=>{i.jb("ReduceL1",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(A().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},834273:(o,p,h,y,w)=>{i.jb("ReduceL2",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(A().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},834446:(o,p,h,y,w)=>{i.jb("ReduceLogSum",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(A().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},834623:(o,p,h,y,w)=>{i.jb("ReduceSumSquare",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(A().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},834803:(o,p,h,y,w)=>{i.jb("ReduceLogSumExp",o,{keepDims:!!p,noopWithEmptyAxes:!!h,axes:y?Array.from(A().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},834983:o=>{i.jb("Where",o,void 0)},835036:(o,p,h)=>{i.jb("Transpose",o,{perm:p?Array.from(A().subarray(Number(p)>>>0,Number(h)>>>0)):[]})},835160:(o,p,h,y)=>{i.jb("DepthToSpace",o,{blocksize:p,mode:we(h),format:y?"NHWC":"NCHW"})},835293:(o,p,h,y)=>{i.jb("DepthToSpace",o,{blocksize:p,mode:we(h),format:y?"NHWC":"NCHW"})},835426:(o,p,h,y,w,I,O,D,q,H,se,le,he,Te,zt)=>{i.jb("ConvTranspose",o,{format:q?"NHWC":"NCHW",autoPad:p,dilations:[h],group:y,kernelShape:[w],pads:[I,O],strides:[D],wIsConst:()=>!!fe()[H>>>0],outputPadding:se?Array.from(A().subarray(Number(se)>>>0,Number(le)>>>0)):[],outputShape:he?Array.from(A().subarray(Number(he)>>>0,Number(Te)>>>0)):[],activation:we(zt)})},835859:(o,p,h,y,w,I,O,D,q,H,se,le,he,Te)=>{i.jb("ConvTranspose",o,{format:D?"NHWC":"NCHW",autoPad:p,dilations:Array.from(A().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:y,kernelShape:Array.from(A().subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),pads:Array.from(A().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(A().subarray(Number(O)>>>0,2+(Number(O)>>>0)>>>0)),wIsConst:()=>!!fe()[q>>>0],outputPadding:H?Array.from(A().subarray(Number(H)>>>0,Number(se)>>>0)):[],outputShape:le?Array.from(A().subarray(Number(le)>>>0,Number(he)>>>0)):[],activation:we(Te)})},836520:(o,p,h,y,w,I,O,D,q,H,se,le,he,Te,zt)=>{i.jb("ConvTranspose",o,{format:q?"NHWC":"NCHW",autoPad:p,dilations:[h],group:y,kernelShape:[w],pads:[I,O],strides:[D],wIsConst:()=>!!fe()[H>>>0],outputPadding:se?Array.from(A().subarray(Number(se)>>>0,Number(le)>>>0)):[],outputShape:he?Array.from(A().subarray(Number(he)>>>0,Number(Te)>>>0)):[],activation:we(zt)})},836953:(o,p,h,y,w,I,O,D,q,H,se,le,he,Te)=>{i.jb("ConvTranspose",o,{format:D?"NHWC":"NCHW",autoPad:p,dilations:Array.from(A().subarray(Number(h)>>>0,2+(Number(h)>>>0)>>>0)),group:y,kernelShape:Array.from(A().subarray(Number(w)>>>0,2+(Number(w)>>>0)>>>0)),pads:Array.from(A().subarray(Number(I)>>>0,4+(Number(I)>>>0)>>>0)),strides:Array.from(A().subarray(Number(O)>>>0,2+(Number(O)>>>0)>>>0)),wIsConst:()=>!!fe()[q>>>0],outputPadding:H?Array.from(A().subarray(Number(H)>>>0,Number(se)>>>0)):[],outputShape:le?Array.from(A().subarray(Number(le)>>>0,Number(he)>>>0)):[],activation:we(Te)})},837614:(o,p)=>{i.jb("GlobalAveragePool",o,{format:p?"NHWC":"NCHW"})},837705:(o,p,h,y,w,I,O,D,q,H,se,le,he,Te)=>{i.jb("AveragePool",o,{format:Te?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:y,storage_order:w,dilations:I?Array.from(A().subarray(Number(I)>>>0,Number(O)>>>0)):[],kernel_shape:D?Array.from(A().subarray(Number(D)>>>0,Number(q)>>>0)):[],pads:H?Array.from(A().subarray(Number(H)>>>0,Number(se)>>>0)):[],strides:le?Array.from(A().subarray(Number(le)>>>0,Number(he)>>>0)):[]})},838184:(o,p)=>{i.jb("GlobalAveragePool",o,{format:p?"NHWC":"NCHW"})},838275:(o,p,h,y,w,I,O,D,q,H,se,le,he,Te)=>{i.jb("AveragePool",o,{format:Te?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:y,storage_order:w,dilations:I?Array.from(A().subarray(Number(I)>>>0,Number(O)>>>0)):[],kernel_shape:D?Array.from(A().subarray(Number(D)>>>0,Number(q)>>>0)):[],pads:H?Array.from(A().subarray(Number(H)>>>0,Number(se)>>>0)):[],strides:le?Array.from(A().subarray(Number(le)>>>0,Number(he)>>>0)):[]})},838754:(o,p)=>{i.jb("GlobalMaxPool",o,{format:p?"NHWC":"NCHW"})},838841:(o,p,h,y,w,I,O,D,q,H,se,le,he,Te)=>{i.jb("MaxPool",o,{format:Te?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:y,storage_order:w,dilations:I?Array.from(A().subarray(Number(I)>>>0,Number(O)>>>0)):[],kernel_shape:D?Array.from(A().subarray(Number(D)>>>0,Number(q)>>>0)):[],pads:H?Array.from(A().subarray(Number(H)>>>0,Number(se)>>>0)):[],strides:le?Array.from(A().subarray(Number(le)>>>0,Number(he)>>>0)):[]})},839316:(o,p)=>{i.jb("GlobalMaxPool",o,{format:p?"NHWC":"NCHW"})},839403:(o,p,h,y,w,I,O,D,q,H,se,le,he,Te)=>{i.jb("MaxPool",o,{format:Te?"NHWC":"NCHW",auto_pad:p,ceil_mode:h,count_include_pad:y,storage_order:w,dilations:I?Array.from(A().subarray(Number(I)>>>0,Number(O)>>>0)):[],kernel_shape:D?Array.from(A().subarray(Number(D)>>>0,Number(q)>>>0)):[],pads:H?Array.from(A().subarray(Number(H)>>>0,Number(se)>>>0)):[],strides:le?Array.from(A().subarray(Number(le)>>>0,Number(he)>>>0)):[]})},839878:(o,p,h,y,w)=>{i.jb("Gemm",o,{alpha:p,beta:h,transA:y,transB:w})},839982:o=>{i.jb("MatMul",o,void 0)},840036:(o,p,h,y)=>{i.jb("ArgMax",o,{keepDims:!!p,selectLastIndex:!!h,axis:y})},840144:(o,p,h,y)=>{i.jb("ArgMin",o,{keepDims:!!p,selectLastIndex:!!h,axis:y})},840252:(o,p)=>{i.jb("Softmax",o,{axis:p})},840315:(o,p)=>{i.jb("Concat",o,{axis:p})},840375:(o,p,h,y,w)=>{i.jb("Split",o,{axis:p,numOutputs:h,splitSizes:y?Array.from(A().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},840531:o=>{i.jb("Expand",o,void 0)},840585:(o,p)=>{i.jb("Gather",o,{axis:Number(p)})},840656:(o,p)=>{i.jb("GatherElements",o,{axis:Number(p)})},840735:(o,p)=>{i.jb("GatherND",o,{batch_dims:Number(p)})},840814:(o,p,h,y,w,I,O,D,q,H,se)=>{i.jb("Resize",o,{antialias:p,axes:h?Array.from(A().subarray(Number(h)>>>0,Number(y)>>>0)):[],coordinateTransformMode:we(w),cubicCoeffA:I,excludeOutside:O,extrapolationValue:D,keepAspectRatioPolicy:we(q),mode:we(H),nearestMode:we(se)})},841176:(o,p,h,y,w,I,O)=>{i.jb("Slice",o,{starts:p?Array.from(A().subarray(Number(p)>>>0,Number(h)>>>0)):[],ends:y?Array.from(A().subarray(Number(y)>>>0,Number(w)>>>0)):[],axes:I?Array.from(A().subarray(Number(I)>>>0,Number(O)>>>0)):[]})},841440:o=>{i.jb("Tile",o,void 0)},841492:(o,p,h)=>{i.jb("InstanceNormalization",o,{epsilon:p,format:h?"NHWC":"NCHW"})},841606:(o,p,h)=>{i.jb("InstanceNormalization",o,{epsilon:p,format:h?"NHWC":"NCHW"})},841720:o=>{i.jb("Range",o,void 0)},841773:(o,p)=>{i.jb("Einsum",o,{equation:we(p)})},841854:(o,p,h,y,w)=>{i.jb("Pad",o,{mode:p,value:h,pads:y?Array.from(A().subarray(Number(y)>>>0,Number(w)>>>0)):[]})},841997:(o,p,h,y,w,I)=>{i.jb("BatchNormalization",o,{epsilon:p,momentum:h,spatial:!!w,trainingMode:!!y,format:I?"NHWC":"NCHW"})},842166:(o,p,h,y,w,I)=>{i.jb("BatchNormalization",o,{epsilon:p,momentum:h,spatial:!!w,trainingMode:!!y,format:I?"NHWC":"NCHW"})},842335:(o,p,h)=>{i.jb("CumSum",o,{exclusive:Number(p),reverse:Number(h)})},842432:(o,p,h)=>{i.jb("DequantizeLinear",o,{axis:p,blockSize:h})},842522:(o,p,h,y,w)=>{i.jb("GridSample",o,{align_corners:p,mode:we(h),padding_mode:we(y),format:w?"NHWC":"NCHW"})},842692:(o,p,h,y,w)=>{i.jb("GridSample",o,{align_corners:p,mode:we(h),padding_mode:we(y),format:w?"NHWC":"NCHW"})},842862:(o,p)=>{i.jb("ScatterND",o,{reduction:we(p)})},842947:(o,p,h,y,w,I,O,D,q)=>{i.jb("Attention",o,{numHeads:p,isUnidirectional:h,maskFilterValue:y,scale:w,doRotary:I,qkvHiddenSizes:O?Array.from(A().subarray(Number(D)>>>0,Number(D)+O>>>0)):[],pastPresentShareBuffer:!!q})},843219:o=>{i.jb("BiasAdd",o,void 0)},843274:o=>{i.jb("BiasSplitGelu",o,void 0)},843335:o=>{i.jb("FastGelu",o,void 0)},843391:(o,p,h,y,w,I,O,D,q,H,se,le,he,Te,zt,_m)=>{i.jb("Conv",o,{format:le?"NHWC":"NCHW",auto_pad:p,dilations:h?Array.from(A().subarray(Number(h)>>>0,Number(y)>>>0)):[],group:w,kernel_shape:I?Array.from(A().subarray(Number(I)>>>0,Number(O)>>>0)):[],pads:D?Array.from(A().subarray(Number(D)>>>0,Number(q)>>>0)):[],strides:H?Array.from(A().subarray(Number(H)>>>0,Number(se)>>>0)):[],w_is_const:()=>!!fe()[Number(he)>>>0],activation:we(Te),activation_params:zt?Array.from(De().subarray(Number(zt)>>>0,Number(_m)>>>0)):[]})},843975:o=>{i.jb("Gelu",o,void 0)},844027:(o,p,h,y,w,I,O,D,q)=>{i.jb("GroupQueryAttention",o,{numHeads:p,kvNumHeads:h,scale:y,softcap:w,doRotary:I,rotaryInterleaved:O,smoothSoftmax:D,localWindowSize:q})},844244:(o,p,h,y)=>{i.jb("LayerNormalization",o,{axis:p,epsilon:h,simplified:!!y})},844355:(o,p,h,y)=>{i.jb("LayerNormalization",o,{axis:p,epsilon:h,simplified:!!y})},844466:(o,p,h,y,w,I)=>{i.jb("MatMulNBits",o,{k:p,n:h,accuracyLevel:y,bits:w,blockSize:I})},844593:(o,p,h,y,w,I)=>{i.jb("MultiHeadAttention",o,{numHeads:p,isUnidirectional:h,maskFilterValue:y,scale:w,doRotary:I})},844752:(o,p)=>{i.jb("QuickGelu",o,{alpha:p})},844816:(o,p,h,y,w)=>{i.jb("RotaryEmbedding",o,{interleaved:!!p,numHeads:h,rotaryEmbeddingDim:y,scale:w})},844955:(o,p,h)=>{i.jb("SkipLayerNormalization",o,{epsilon:p,simplified:!!h})},845057:(o,p,h)=>{i.jb("SkipLayerNormalization",o,{epsilon:p,simplified:!!h})},845159:(o,p,h,y)=>{i.jb("GatherBlockQuantized",o,{gatherAxis:p,quantizeAxis:h,blockSize:y})},845280:o=>{i.Zb(o)},845314:(o,p)=>i.ac(Number(o),Number(p),i.Fb.dc,i.Fb.errors)};function Xf(o,p,h){return Fn(async()=>{await i.Xb(Number(o),Number(p),Number(h))})}function Yf(){return typeof wasmOffsetConverter<"u"}class Kr{name="ExitStatus";constructor(p){this.message=`Program terminated with exit(${p})`,this.status=p}}var hn=o=>{o.terminate(),o.onmessage=()=>{}},Zr=[],mn=o=>{nt.length==0&&(wn(),$n(nt[0]));var p=nt.pop();if(!p)return 6;Wt.push(p),ht[o.Ab]=p,p.Ab=o.Ab;var h={Bb:"run",fc:o.ec,Hb:o.Hb,Ab:o.Ab};return p.postMessage(h,o.Mb),0},at=0,_e=(o,p,...h)=>{for(var y=2*h.length,w=fi(),I=ci(8*y),O=I>>>3,D=0;D<h.length;D++){var q=h[D];typeof q=="bigint"?(ee[O+2*D]=1n,ee[O+2*D+1]=q):(ee[O+2*D]=0n,be()[O+2*D+1>>>0]=q)}return o=ms(o,0,y,I,p),br(w),o};function Qr(o){if(u)return _e(0,1,o);if(E=o,!(0<at)){for(var p of Wt)hn(p);for(p of nt)hn(p);nt=[],Wt=[],ht={},re=!0}g(0,new Kr(o))}function gn(o){if(u)return _e(1,0,o);Xr(o)}var Xr=o=>{if(E=o,u)throw gn(o),"unwind";Qr(o)},nt=[],Wt=[],_n=[],ht={},yn=o=>{var p=o.Ab;delete ht[p],nt.push(o),Wt.splice(Wt.indexOf(o),1),o.Ab=0,gs(p)};function bn(){_n.forEach(o=>o())}var $n=o=>new Promise(p=>{o.onmessage=w=>{var I=(w=w.data).Bb;if(w.Gb&&w.Gb!=_r()){var O=ht[w.Gb];O?O.postMessage(w,w.Mb):k(`Internal error! Worker sent a message "${I}" to target pthread ${w.Gb}, but that thread no longer exists!`)}else I==="checkMailbox"?lr():I==="spawnThread"?mn(w):I==="cleanupThread"?yn(ht[w.hc]):I==="loaded"?(o.loaded=!0,p(o)):I==="alert"?alert(`Thread ${w.ic}: ${w.text}`):w.target==="setimmediate"?o.postMessage(w):I==="callHandler"?i[w.Qb](...w.args):I&&k(`worker sent an unknown command ${I}`)},o.onerror=w=>{throw k(`worker sent an error! ${w.filename}:${w.lineno}: ${w.message}`),w};var h,y=[];for(h of[])i.propertyIsEnumerable(h)&&y.push(h);o.postMessage({Bb:"load",Rb:y,kc:S,lc:T})});function wn(){var o=new Worker((()=>{let p=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new p("ort.webgpu.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});nt.push(o)}var Jf=o=>{ze();var p=ae()[o+52>>>2>>>0];o=ae()[o+56>>>2>>>0],bs(p,p-o),br(p)},eh=(o,p)=>{at=0,o=$s(o,p),0<at?E=o:pi(o)};class th{constructor(p){this.Ib=p-24}}function rh(o,p,h){var y=new th(o>>>=0);throw p>>>=0,h>>>=0,ae()[y.Ib+16>>>2>>>0]=0,ae()[y.Ib+4>>>2>>>0]=p,ae()[y.Ib+8>>>2>>>0]=h,o}function vn(o,p,h,y){return u?_e(2,1,o,p,h,y):xn(o,p,h,y)}function xn(o,p,h,y){if(o>>>=0,h>>>=0,y>>>=0,l===void 0)return 6;var w=[];return u&&w.length===0?vn(o,p>>>=0,h,y):(o={ec:h,Ab:o,Hb:y,Mb:w},u?(o.Bb="spawnThread",postMessage(o,w),0):mn(o))}var Sn=typeof TextDecoder<"u"?new TextDecoder:void 0,kn=(o,p=0,h=NaN)=>{var y=(p>>>=0)+h;for(h=p;o[h]&&!(h>=y);)++h;if(16<h-p&&o.buffer&&Sn)return Sn.decode(o.buffer instanceof ArrayBuffer?o.subarray(p,h):o.slice(p,h));for(y="";p<h;){var w=o[p++];if(128&w){var I=63&o[p++];if((224&w)==192)y+=String.fromCharCode((31&w)<<6|I);else{var O=63&o[p++];65536>(w=(240&w)==224?(15&w)<<12|I<<6|O:(7&w)<<18|I<<12|O<<6|63&o[p++])?y+=String.fromCharCode(w):(w-=65536,y+=String.fromCharCode(55296|w>>10,56320|1023&w))}}else y+=String.fromCharCode(w)}return y},we=(o,p)=>(o>>>=0)?kn(M(),o,p):"";function Tn(o,p,h){return u?_e(3,1,o,p,h):0}function In(o,p){if(u)return _e(4,1,o,p)}var En=o=>{for(var p=0,h=0;h<o.length;++h){var y=o.charCodeAt(h);127>=y?p++:2047>=y?p+=2:55296<=y&&57343>=y?(p+=4,++h):p+=3}return p},It=(o,p,h)=>{var y=M();if(p>>>=0,0<h){var w=p;h=p+h-1;for(var I=0;I<o.length;++I){var O=o.charCodeAt(I);if(55296<=O&&57343>=O&&(O=65536+((1023&O)<<10)|1023&o.charCodeAt(++I)),127>=O){if(p>=h)break;y[p++>>>0]=O}else{if(2047>=O){if(p+1>=h)break;y[p++>>>0]=192|O>>6}else{if(65535>=O){if(p+2>=h)break;y[p++>>>0]=224|O>>12}else{if(p+3>=h)break;y[p++>>>0]=240|O>>18,y[p++>>>0]=128|O>>12&63}y[p++>>>0]=128|O>>6&63}y[p++>>>0]=128|63&O}}y[p>>>0]=0,o=p-w}else o=0;return o};function zn(o,p){if(u)return _e(5,1,o,p)}function Cn(o,p,h){if(u)return _e(6,1,o,p,h)}function An(o,p,h){return u?_e(7,1,o,p,h):0}function On(o,p){if(u)return _e(8,1,o,p)}function Rn(o,p,h){if(u)return _e(9,1,o,p,h)}function Bn(o,p,h,y){if(u)return _e(10,1,o,p,h,y)}function Mn(o,p,h,y){if(u)return _e(11,1,o,p,h,y)}function Nn(o,p,h,y){if(u)return _e(12,1,o,p,h,y)}function Dn(o){if(u)return _e(13,1,o)}function Pn(o,p){if(u)return _e(14,1,o,p)}function Un(o,p,h){if(u)return _e(15,1,o,p,h)}var qn,st,ih=()=>it(""),Fe=o=>{for(var p="";M()[o>>>0];)p+=qn[M()[o++>>>0]];return p},Yr={},Jr={},ah={};function Ye(o,p,h={}){return function(y,w,I={}){var O=w.name;if(!y)throw new st(`type "${O}" must have a positive integer typeid pointer`);if(Jr.hasOwnProperty(y)){if(I.Sb)return;throw new st(`Cannot register type '${O}' twice`)}Jr[y]=w,delete ah[y],Yr.hasOwnProperty(y)&&(w=Yr[y],delete Yr[y],w.forEach(D=>D()))}(o,p,h)}var Wn=(o,p,h)=>{switch(p){case 1:return h?y=>fe()[y>>>0]:y=>M()[y>>>0];case 2:return h?y=>W()[y>>>1>>>0]:y=>te()[y>>>1>>>0];case 4:return h?y=>A()[y>>>2>>>0]:y=>ae()[y>>>2>>>0];case 8:return h?y=>ee[y>>>3]:y=>oe[y>>>3];default:throw new TypeError(`invalid integer width (${p}): ${o}`)}};function nh(o,p,h){h>>>=0,Ye(o>>>=0,{name:p=Fe(p>>>0),fromWireType:y=>y,toWireType:function(y,w){if(typeof w!="bigint"&&typeof w!="number")throw w=w===null?"null":(y=typeof w)=="object"||y==="array"||y==="function"?w.toString():""+w,new TypeError(`Cannot convert "${w}" to ${this.name}`);return typeof w=="number"&&(w=BigInt(w)),w},Cb:ot,readValueFromPointer:Wn(p,h,p.indexOf("u")==-1),Db:null})}var ot=8;function sh(o,p,h,y){Ye(o>>>=0,{name:p=Fe(p>>>0),fromWireType:function(w){return!!w},toWireType:function(w,I){return I?h:y},Cb:ot,readValueFromPointer:function(w){return this.fromWireType(M()[w>>>0])},Db:null})}var ei=[],Je=[];function ti(o){9<(o>>>=0)&&--Je[o+1]==0&&(Je[o]=void 0,ei.push(o))}var Ce=o=>{if(!o)throw new st("Cannot use deleted val. handle = "+o);return Je[o]},Be=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let p=ei.pop()||Je.length;return Je[p]=o,Je[p+1]=1,p}};function ri(o){return this.fromWireType(ae()[o>>>2>>>0])}var oh={name:"emscripten::val",fromWireType:o=>{var p=Ce(o);return ti(o),p},toWireType:(o,p)=>Be(p),Cb:ot,readValueFromPointer:ri,Db:null};function uh(o){return Ye(o>>>0,oh)}var lh=(o,p)=>{switch(p){case 4:return function(h){return this.fromWireType(De()[h>>>2>>>0])};case 8:return function(h){return this.fromWireType(be()[h>>>3>>>0])};default:throw new TypeError(`invalid float width (${p}): ${o}`)}};function dh(o,p,h){h>>>=0,Ye(o>>>=0,{name:p=Fe(p>>>0),fromWireType:y=>y,toWireType:(y,w)=>w,Cb:ot,readValueFromPointer:lh(p,h),Db:null})}function ph(o,p,h,y,w){if(o>>>=0,h>>>=0,p=Fe(p>>>0),w===-1&&(w=4294967295),w=D=>D,y===0){var I=32-8*h;w=D=>D<<I>>>I}var O=p.includes("unsigned")?function(D,q){return q>>>0}:function(D,q){return q};Ye(o,{name:p,fromWireType:w,toWireType:O,Cb:ot,readValueFromPointer:Wn(p,h,y!==0),Db:null})}function ch(o,p,h){function y(I){var O=ae()[I>>>2>>>0];return I=ae()[I+4>>>2>>>0],new w(fe().buffer,I,O)}var w=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][p];Ye(o>>>=0,{name:h=Fe(h>>>0),fromWireType:y,Cb:ot,readValueFromPointer:y},{Sb:!0})}function fh(o,p){Ye(o>>>=0,{name:p=Fe(p>>>0),fromWireType:function(h){for(var y,w=ae()[h>>>2>>>0],I=h+4,O=I,D=0;D<=w;++D){var q=I+D;D!=w&&M()[q>>>0]!=0||(O=we(O,q-O),y===void 0?y=O:(y+="\0",y+=O),O=q+1)}return Ze(h),y},toWireType:function(h,y){y instanceof ArrayBuffer&&(y=new Uint8Array(y));var w=typeof y=="string";if(!(w||y instanceof Uint8Array||y instanceof Uint8ClampedArray||y instanceof Int8Array))throw new st("Cannot pass non-string to std::string");var I=w?En(y):y.length,O=yr(4+I+1),D=O+4;if(ae()[O>>>2>>>0]=I,w)It(y,D,I+1);else if(w)for(w=0;w<I;++w){var q=y.charCodeAt(w);if(255<q)throw Ze(O),new st("String has UTF-16 code units that do not fit in 8 bits");M()[D+w>>>0]=q}else for(w=0;w<I;++w)M()[D+w>>>0]=y[w];return h!==null&&h.push(Ze,O),O},Cb:ot,readValueFromPointer:ri,Db(h){Ze(h)}})}var Ln=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,hh=(o,p)=>{for(var h=o>>1,y=h+p/2;!(h>=y)&&te()[h>>>0];)++h;if(32<(h<<=1)-o&&Ln)return Ln.decode(M().slice(o,h));for(h="",y=0;!(y>=p/2);++y){var w=W()[o+2*y>>>1>>>0];if(w==0)break;h+=String.fromCharCode(w)}return h},mh=(o,p,h)=>{if(h??=2147483647,2>h)return 0;var y=p;h=(h-=2)<2*o.length?h/2:o.length;for(var w=0;w<h;++w){var I=o.charCodeAt(w);W()[p>>>1>>>0]=I,p+=2}return W()[p>>>1>>>0]=0,p-y},gh=o=>2*o.length,_h=(o,p)=>{for(var h=0,y="";!(h>=p/4);){var w=A()[o+4*h>>>2>>>0];if(w==0)break;++h,65536<=w?(w-=65536,y+=String.fromCharCode(55296|w>>10,56320|1023&w)):y+=String.fromCharCode(w)}return y},yh=(o,p,h)=>{if(p>>>=0,h??=2147483647,4>h)return 0;var y=p;h=y+h-4;for(var w=0;w<o.length;++w){var I=o.charCodeAt(w);if(55296<=I&&57343>=I&&(I=65536+((1023&I)<<10)|1023&o.charCodeAt(++w)),A()[p>>>2>>>0]=I,(p+=4)+4>h)break}return A()[p>>>2>>>0]=0,p-y},bh=o=>{for(var p=0,h=0;h<o.length;++h){var y=o.charCodeAt(h);55296<=y&&57343>=y&&++h,p+=4}return p};function $h(o,p,h){if(o>>>=0,p>>>=0,h=Fe(h>>>=0),p===2)var y=hh,w=mh,I=gh,O=D=>te()[D>>>1>>>0];else p===4&&(y=_h,w=yh,I=bh,O=D=>ae()[D>>>2>>>0]);Ye(o,{name:h,fromWireType:D=>{for(var q,H=ae()[D>>>2>>>0],se=D+4,le=0;le<=H;++le){var he=D+4+le*p;le!=H&&O(he)!=0||(se=y(se,he-se),q===void 0?q=se:(q+="\0",q+=se),se=he+p)}return Ze(D),q},toWireType:(D,q)=>{if(typeof q!="string")throw new st(`Cannot pass non-string to C++ string type ${h}`);var H=I(q),se=yr(4+H+p);return ae()[se>>>2>>>0]=H/p,w(q,se+4,H+p),D!==null&&D.push(Ze,se),se},Cb:ot,readValueFromPointer:ri,Db(D){Ze(D)}})}function wh(o,p){Ye(o>>>=0,{Tb:!0,name:p=Fe(p>>>0),Cb:0,fromWireType:()=>{},toWireType:()=>{}})}function vh(o){di(o>>>0,!s,1,!n,131072,!1),bn()}var ii=o=>{if(!re)try{if(o(),!(0<at))try{u?pi(E):Xr(E)}catch(p){p instanceof Kr||p=="unwind"||g(0,p)}}catch(p){p instanceof Kr||p=="unwind"||g(0,p)}};function ai(o){o>>>=0,typeof Atomics.jc=="function"&&(Atomics.jc(A(),o>>>2,o).value.then(lr),o+=128,Atomics.store(A(),o>>>2,1))}var lr=()=>{var o=_r();o&&(ai(o),ii(ys))};function xh(o,p){(o>>>=0)==p>>>0?setTimeout(lr):u?postMessage({Gb:o,Bb:"checkMailbox"}):(o=ht[o])&&o.postMessage({Bb:"checkMailbox"})}var ni=[];function Sh(o,p,h,y,w){for(p>>>=0,y/=2,ni.length=y,h=w>>>0>>>3,w=0;w<y;w++)ni[w]=ee[h+2*w]?ee[h+2*w+1]:be()[h+2*w+1>>>0];return(p?Fr[p]:gm[o])(...ni)}var kh=()=>{at=0};function Th(o){o>>>=0,u?postMessage({Bb:"cleanupThread",hc:o}):yn(ht[o])}function Ih(o){}var dr=(o,p)=>{var h=Jr[o];if(h===void 0)throw o=cs(o),h=Fe(o),Ze(o),new st(`${p} has unknown type ${h}`);return h},Vn=(o,p,h)=>{var y=[];return o=o.toWireType(y,h),y.length&&(ae()[p>>>2>>>0]=Be(y)),o};function Eh(o,p,h){return p>>>=0,h>>>=0,o=Ce(o>>>0),p=dr(p,"emval::as"),Vn(p,h,o)}function zh(o,p){return p>>>=0,o=Ce(o>>>0),(p=dr(p,"emval::as")).toWireType(null,o)}var pr=o=>{try{o()}catch(p){it(p)}},ut=0,Ke=null,jn=0,cr=[],Gn={},Hn={},Ch=0,si=null,Ah=[];function Fn(o){return function(p){if(!re){if(ut===0){var h=!1,y=!1;p((w=0)=>{if(!re&&(jn=w,h=!0,y)){ut=2,pr(()=>xs(Ke)),typeof MainLoop<"u"&&MainLoop.Pb&&MainLoop.resume(),w=!1;try{var I=function(){var q=A()[Ke+8>>>2>>>0];return q=Z[Hn[q]],--at,q()}()}catch(q){I=q,w=!0}var O=!1;if(!Ke){var D=si;D&&(si=null,(w?D.reject:D.resolve)(I),O=!0)}if(w&&!O)throw I}}),y=!0,h||(ut=1,Ke=function(){var w=yr(65548),I=w+12;ae()[w>>>2>>>0]=I,ae()[w+4>>>2>>>0]=I+65536,I=cr[0];var O=Gn[I];return O===void 0&&(O=Ch++,Gn[I]=O,Hn[O]=I),I=O,A()[w+8>>>2>>>0]=I,w}(),typeof MainLoop<"u"&&MainLoop.Pb&&MainLoop.pause(),pr(()=>ws(Ke)))}else ut===2?(ut=0,pr(Ss),Ze(Ke),Ke=null,Ah.forEach(ii)):it(`invalid state: ${ut}`);return jn}}(p=>{o().then(p)})}function Oh(o){return o>>>=0,Fn(async()=>{var p=await Ce(o);return Be(p)})}var fr=[];function Rh(o,p,h,y){return h>>>=0,y>>>=0,(o=fr[o>>>0])(null,p=Ce(p>>>0),h,y)}var Bh={},hr=o=>{var p=Bh[o];return p===void 0?Fe(o):p};function Mh(o,p,h,y,w){return h>>>=0,y>>>=0,w>>>=0,(o=fr[o>>>0])(p=Ce(p>>>0),p[h=hr(h)],y,w)}var Kn=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Nh(o){return(o>>>=0)==0?Be(Kn()):(o=hr(o),Be(Kn()[o]))}var Dh=o=>{var p=fr.length;return fr.push(o),p},Ph=(o,p)=>{for(var h=Array(o),y=0;y<o;++y)h[y]=dr(ae()[p+4*y>>>2>>>0],"parameter "+y);return h},Zn=(o,p)=>Object.defineProperty(p,"name",{value:o});function Uh(o,p,h){var y=(p=Ph(o,p>>>0)).shift();o--;var w=`return function (obj, func, destructorsRef, args) {
`,I=0,O=[];h===0&&O.push("obj");for(var D=["retType"],q=[y],H=0;H<o;++H)O.push("arg"+H),D.push("argType"+H),q.push(p[H]),w+=`  var arg${H} = argType${H}.readValueFromPointer(args${I?"+"+I:""});
`,I+=p[H].Cb;return w+=`  var rv = ${h===1?"new func":"func.call"}(${O.join(", ")});
`,y.Tb||(D.push("emval_returnValue"),q.push(Vn),w+=`  return emval_returnValue(retType, destructorsRef, rv);
`),D.push(w+`};
`),o=function(se){var le=Function;if(!(le instanceof Function))throw new TypeError(`new_ called with constructor type ${typeof le} which is not a function`);var he=Zn(le.name||"unknownFunctionName",function(){});return he.prototype=le.prototype,he=new he,(se=le.apply(he,se))instanceof Object?se:he}(D)(...q),h=`methodCaller<(${p.map(se=>se.name).join(", ")}) => ${y.name}>`,Dh(Zn(h,o))}function qh(o){return o=hr(o>>>0),Be(i[o])}function Wh(o,p){return p>>>=0,o=Ce(o>>>0),p=Ce(p),Be(o[p])}function Lh(o){9<(o>>>=0)&&(Je[o+1]+=1)}function Vh(){return Be([])}function jh(o){o=Ce(o>>>0);for(var p=Array(o.length),h=0;h<o.length;h++)p[h]=o[h];return Be(p)}function Gh(o){return Be(hr(o>>>0))}function Hh(){return Be({})}function Fh(o){for(var p=Ce(o>>>=0);p.length;){var h=p.pop();p.pop()(h)}ti(o)}function Kh(o,p,h){p>>>=0,h>>>=0,o=Ce(o>>>0),p=Ce(p),h=Ce(h),o[p]=h}function Zh(o,p){return p>>>=0,o=(o=dr(o>>>0,"_emval_take_value")).readValueFromPointer(p),Be(o)}function Qh(o,p){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),p>>>=0,o=new Date(1e3*o),A()[p>>>2>>>0]=o.getUTCSeconds(),A()[p+4>>>2>>>0]=o.getUTCMinutes(),A()[p+8>>>2>>>0]=o.getUTCHours(),A()[p+12>>>2>>>0]=o.getUTCDate(),A()[p+16>>>2>>>0]=o.getUTCMonth(),A()[p+20>>>2>>>0]=o.getUTCFullYear()-1900,A()[p+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,A()[p+28>>>2>>>0]=o}var Qn=o=>o%4==0&&(o%100!=0||o%400==0),Xn=[0,31,60,91,121,152,182,213,244,274,305,335],Yn=[0,31,59,90,120,151,181,212,243,273,304,334];function Xh(o,p){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),p>>>=0,o=new Date(1e3*o),A()[p>>>2>>>0]=o.getSeconds(),A()[p+4>>>2>>>0]=o.getMinutes(),A()[p+8>>>2>>>0]=o.getHours(),A()[p+12>>>2>>>0]=o.getDate(),A()[p+16>>>2>>>0]=o.getMonth(),A()[p+20>>>2>>>0]=o.getFullYear()-1900,A()[p+24>>>2>>>0]=o.getDay();var h=(Qn(o.getFullYear())?Xn:Yn)[o.getMonth()]+o.getDate()-1|0;A()[p+28>>>2>>>0]=h,A()[p+36>>>2>>>0]=-60*o.getTimezoneOffset(),h=new Date(o.getFullYear(),6,1).getTimezoneOffset();var y=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(h!=y&&o.getTimezoneOffset()==Math.min(y,h)),A()[p+32>>>2>>>0]=o}function Yh(o){o>>>=0;var p=new Date(A()[o+20>>>2>>>0]+1900,A()[o+16>>>2>>>0],A()[o+12>>>2>>>0],A()[o+8>>>2>>>0],A()[o+4>>>2>>>0],A()[o>>>2>>>0],0),h=A()[o+32>>>2>>>0],y=p.getTimezoneOffset(),w=new Date(p.getFullYear(),6,1).getTimezoneOffset(),I=new Date(p.getFullYear(),0,1).getTimezoneOffset(),O=Math.min(I,w);return 0>h?A()[o+32>>>2>>>0]=+(w!=I&&O==y):0<h!=(O==y)&&(w=Math.max(I,w),p.setTime(p.getTime()+6e4*((0<h?O:w)-y))),A()[o+24>>>2>>>0]=p.getDay(),h=(Qn(p.getFullYear())?Xn:Yn)[p.getMonth()]+p.getDate()-1|0,A()[o+28>>>2>>>0]=h,A()[o>>>2>>>0]=p.getSeconds(),A()[o+4>>>2>>>0]=p.getMinutes(),A()[o+8>>>2>>>0]=p.getHours(),A()[o+12>>>2>>>0]=p.getDate(),A()[o+16>>>2>>>0]=p.getMonth(),A()[o+20>>>2>>>0]=p.getYear(),o=p.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function Jn(o,p,h,y,w,I,O){return u?_e(16,1,o,p,h,y,w,I,O):-52}function es(o,p,h,y,w,I){if(u)return _e(17,1,o,p,h,y,w,I)}var Lt={},Jh=()=>performance.timeOrigin+performance.now();function ts(o,p){if(u)return _e(18,1,o,p);if(Lt[o]&&(clearTimeout(Lt[o].id),delete Lt[o]),!p)return 0;var h=setTimeout(()=>{delete Lt[o],ii(()=>_s(o,performance.timeOrigin+performance.now()))},p);return Lt[o]={id:h,qc:p},0}function em(o,p,h,y){o>>>=0,p>>>=0,h>>>=0,y>>>=0;var w=new Date().getFullYear(),I=new Date(w,0,1).getTimezoneOffset();w=new Date(w,6,1).getTimezoneOffset();var O=Math.max(I,w);ae()[o>>>2>>>0]=60*O,A()[p>>>2>>>0]=+(I!=w),o=(p=D=>{var q=Math.abs(D);return`UTC${0<=D?"-":"+"}${String(Math.floor(q/60)).padStart(2,"0")}${String(q%60).padStart(2,"0")}`})(I),p=p(w),w<I?(It(o,h,17),It(p,y,17)):(It(o,y,17),It(p,h,17))}var tm=()=>Date.now(),rm=1;function im(o,p,h){if(!(0<=o&&3>=o))return 28;if(o===0)o=Date.now();else{if(!rm)return 52;o=performance.timeOrigin+performance.now()}return ee[h>>>0>>>3]=BigInt(Math.round(1e6*o)),0}var oi=[],rs=(o,p)=>{oi.length=0;for(var h;h=M()[o++>>>0];){var y=h!=105;p+=(y&=h!=112)&&p%8?4:0,oi.push(h==112?ae()[p>>>2>>>0]:h==106?ee[p>>>3]:h==105?A()[p>>>2>>>0]:be()[p>>>3>>>0]),p+=y?8:4}return oi};function am(o,p,h){return o>>>=0,p=rs(p>>>0,h>>>0),Fr[o](...p)}function nm(o,p,h){return o>>>=0,p=rs(p>>>0,h>>>0),Fr[o](...p)}var sm=()=>{};function om(o,p){return k(we(o>>>0,p>>>0))}var um=()=>{throw at+=1,"unwind"};function lm(){return 4294901760}var dm=()=>navigator.hardwareConcurrency;function pm(){return it("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function cm(o){o>>>=0;var p=M().length;if(o<=p||4294901760<o)return!1;for(var h=1;4>=h;h*=2){var y=p*(1+.2/h);y=Math.min(y,o+100663296);e:{y=(Math.min(4294901760,65536*Math.ceil(Math.max(o,y)/65536))-S.buffer.byteLength+65535)/65536|0;try{S.grow(y),ze();var w=1;break e}catch{}w=void 0}if(w)return!0}return!1}var mr=()=>(it("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Et={},is=o=>{o.forEach(p=>{var h=mr();h&&(Et[h]=p)})};function fm(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),is(o),Et.Lb=mr(),Et.cc=o,Et.Lb}function hm(o,p,h){if(o>>>=0,p>>>=0,Et.Lb==o)var y=Et.cc;else(y=Error().stack.toString().split(`
`))[0]=="Error"&&y.shift(),is(y);for(var w=3;y[w]&&mr()!=o;)++w;for(o=0;o<h&&y[o+w];++o)A()[p+4*o>>>2>>>0]=mr();return o}var ui,li={},as=()=>{if(!ui){var o,p={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in li)li[o]===void 0?delete p[o]:p[o]=li[o];var h=[];for(o in p)h.push(`${o}=${p[o]}`);ui=h}return ui};function ns(o,p){if(u)return _e(19,1,o,p);o>>>=0,p>>>=0;var h=0;return as().forEach((y,w)=>{var I=p+h;for(w=ae()[o+4*w>>>2>>>0]=I,I=0;I<y.length;++I)fe()[w++>>>0]=y.charCodeAt(I);fe()[w>>>0]=0,h+=y.length+1}),0}function ss(o,p){if(u)return _e(20,1,o,p);o>>>=0,p>>>=0;var h=as();ae()[o>>>2>>>0]=h.length;var y=0;return h.forEach(w=>y+=w.length+1),ae()[p>>>2>>>0]=y,0}function os(o){return u?_e(21,1,o):52}function us(o,p,h,y){return u?_e(22,1,o,p,h,y):52}function ls(o,p,h,y){return u?_e(23,1,o,p,h,y):70}var mm=[null,[],[]];function ds(o,p,h,y){if(u)return _e(24,1,o,p,h,y);p>>>=0,h>>>=0,y>>>=0;for(var w=0,I=0;I<h;I++){var O=ae()[p>>>2>>>0],D=ae()[p+4>>>2>>>0];p+=8;for(var q=0;q<D;q++){var H=M()[O+q>>>0],se=mm[o];H===0||H===10?((o===1?b:k)(kn(se)),se.length=0):se.push(H)}w+=D}return ae()[y>>>2>>>0]=w,0}u||function(){for(var o=i.numThreads-1;o--;)wn();Zr.unshift(()=>{Ut++,function(p){u?p():Promise.all(nt.map($n)).then(p)}(()=>cn())})}();for(var ps=Array(256),gr=0;256>gr;++gr)ps[gr]=String.fromCharCode(gr);qn=ps,st=i.BindingError=class extends Error{constructor(o){super(o),this.name="BindingError"}},i.InternalError=class extends Error{constructor(o){super(o),this.name="InternalError"}},Je.push(0,1,void 0,1,null,1,!0,1,!1,1),i.count_emval_handles=()=>Je.length/2-5-ei.length;var Z,gm=[Qr,gn,vn,Tn,In,zn,Cn,An,On,Rn,Bn,Mn,Nn,Dn,Pn,Un,Jn,es,ts,ns,ss,os,us,ls,ds];(async function(){function o(y,w){return Z=y.exports,Z=function(){var I=Z,O={};for(let[D,q]of Object.entries(I))O[D]=typeof q=="function"?(...H)=>{cr.push(D);try{return q(...H)}finally{re||(cr.pop(),Ke&&ut===1&&cr.length===0&&(ut=0,at+=1,pr(vs),typeof Fibers<"u"&&Fibers.rc()))}}:q;return O}(),Z=function(){var I=Z,O=q=>H=>q(H)>>>0,D=q=>()=>q()>>>0;return(I=Object.assign({},I)).Da=O(I.Da),I.fb=D(I.fb),I.hb=O(I.hb),I.tb=O(I.tb),I.ub=D(I.ub),I.__cxa_get_exception_ptr=O(I.__cxa_get_exception_ptr),I}(),_n.push(Z.ib),T=w,cn(),Z}Ut++;var p=fn();if(i.instantiateWasm)return new Promise(y=>{i.instantiateWasm(p,(w,I)=>{o(w,I),y(w.exports)})});if(u)return new Promise(y=>{He=w=>{var I=new WebAssembly.Instance(w,fn());y(o(I,w))}});Hr??=i.locateFile?i.locateFile?i.locateFile("ort-wasm-simd-threaded.jsep.wasm",$):$+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var h=await async function(y){var w=Hr;if(!Y&&typeof WebAssembly.instantiateStreaming=="function"&&!X(w))try{var I=fetch(w,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(I,y)}catch(O){k(`wasm streaming compile failed: ${O}`),k("falling back to ArrayBuffer instantiation")}return async function(O,D){try{var q=await async function(H){if(!Y)try{var se=await f(H);return new Uint8Array(se)}catch{}if(H==Hr&&Y)H=new Uint8Array(Y);else{if(!m)throw"both async and sync fetching of the wasm failed";H=m(H)}return H}(O);return await WebAssembly.instantiate(q,D)}catch(H){k(`failed to asynchronously prepare wasm: ${H}`),it(H)}}(w,y)}(p);return o(h.instance,h.module)}catch(y){return r(y),Promise.reject(y)}})();var cs=o=>(cs=Z.Da)(o),fs=()=>(fs=Z.Ea)();i._OrtInit=(o,p)=>(i._OrtInit=Z.Fa)(o,p),i._OrtGetLastError=(o,p)=>(i._OrtGetLastError=Z.Ga)(o,p),i._OrtCreateSessionOptions=(o,p,h,y,w,I,O,D,q,H)=>(i._OrtCreateSessionOptions=Z.Ha)(o,p,h,y,w,I,O,D,q,H),i._OrtAppendExecutionProvider=(o,p,h,y,w)=>(i._OrtAppendExecutionProvider=Z.Ia)(o,p,h,y,w),i._OrtAddFreeDimensionOverride=(o,p,h)=>(i._OrtAddFreeDimensionOverride=Z.Ja)(o,p,h),i._OrtAddSessionConfigEntry=(o,p,h)=>(i._OrtAddSessionConfigEntry=Z.Ka)(o,p,h),i._OrtReleaseSessionOptions=o=>(i._OrtReleaseSessionOptions=Z.La)(o),i._OrtCreateSession=(o,p,h)=>(i._OrtCreateSession=Z.Ma)(o,p,h),i._OrtReleaseSession=o=>(i._OrtReleaseSession=Z.Na)(o),i._OrtGetInputOutputCount=(o,p,h)=>(i._OrtGetInputOutputCount=Z.Oa)(o,p,h),i._OrtGetInputOutputMetadata=(o,p,h,y)=>(i._OrtGetInputOutputMetadata=Z.Pa)(o,p,h,y),i._OrtFree=o=>(i._OrtFree=Z.Qa)(o),i._OrtCreateTensor=(o,p,h,y,w,I)=>(i._OrtCreateTensor=Z.Ra)(o,p,h,y,w,I),i._OrtGetTensorData=(o,p,h,y,w)=>(i._OrtGetTensorData=Z.Sa)(o,p,h,y,w),i._OrtReleaseTensor=o=>(i._OrtReleaseTensor=Z.Ta)(o),i._OrtCreateRunOptions=(o,p,h,y)=>(i._OrtCreateRunOptions=Z.Ua)(o,p,h,y),i._OrtAddRunConfigEntry=(o,p,h)=>(i._OrtAddRunConfigEntry=Z.Va)(o,p,h),i._OrtReleaseRunOptions=o=>(i._OrtReleaseRunOptions=Z.Wa)(o),i._OrtCreateBinding=o=>(i._OrtCreateBinding=Z.Xa)(o),i._OrtBindInput=(o,p,h)=>(i._OrtBindInput=Z.Ya)(o,p,h),i._OrtBindOutput=(o,p,h,y)=>(i._OrtBindOutput=Z.Za)(o,p,h,y),i._OrtClearBoundOutputs=o=>(i._OrtClearBoundOutputs=Z._a)(o),i._OrtReleaseBinding=o=>(i._OrtReleaseBinding=Z.$a)(o),i._OrtRunWithBinding=(o,p,h,y,w)=>(i._OrtRunWithBinding=Z.ab)(o,p,h,y,w),i._OrtRun=(o,p,h,y,w,I,O,D)=>(i._OrtRun=Z.bb)(o,p,h,y,w,I,O,D),i._OrtEndProfiling=o=>(i._OrtEndProfiling=Z.cb)(o),i._JsepOutput=(o,p,h)=>(i._JsepOutput=Z.db)(o,p,h),i._JsepGetNodeName=o=>(i._JsepGetNodeName=Z.eb)(o);var _r=()=>(_r=Z.fb)(),Ze=i._free=o=>(Ze=i._free=Z.gb)(o),yr=i._malloc=o=>(yr=i._malloc=Z.hb)(o),di=(o,p,h,y,w,I)=>(di=Z.kb)(o,p,h,y,w,I),hs=()=>(hs=Z.lb)(),ms=(o,p,h,y,w)=>(ms=Z.mb)(o,p,h,y,w),gs=o=>(gs=Z.nb)(o),pi=o=>(pi=Z.ob)(o),_s=(o,p)=>(_s=Z.pb)(o,p),ys=()=>(ys=Z.qb)(),bs=(o,p)=>(bs=Z.rb)(o,p),br=o=>(br=Z.sb)(o),ci=o=>(ci=Z.tb)(o),fi=()=>(fi=Z.ub)(),$s=i.dynCall_ii=(o,p)=>($s=i.dynCall_ii=Z.vb)(o,p),ws=o=>(ws=Z.wb)(o),vs=()=>(vs=Z.xb)(),xs=o=>(xs=Z.yb)(o),Ss=()=>(Ss=Z.zb)();return i.stackSave=()=>fi(),i.stackRestore=o=>br(o),i.stackAlloc=o=>ci(o),i.setValue=function(o,p,h="i8"){switch(h.endsWith("*")&&(h="*"),h){case"i1":case"i8":fe()[o>>>0]=p;break;case"i16":W()[o>>>1>>>0]=p;break;case"i32":A()[o>>>2>>>0]=p;break;case"i64":ee[o>>>3]=BigInt(p);break;case"float":De()[o>>>2>>>0]=p;break;case"double":be()[o>>>3>>>0]=p;break;case"*":ae()[o>>>2>>>0]=p;break;default:it(`invalid type for setValue: ${h}`)}},i.getValue=function(o,p="i8"){switch(p.endsWith("*")&&(p="*"),p){case"i1":case"i8":return fe()[o>>>0];case"i16":return W()[o>>>1>>>0];case"i32":return A()[o>>>2>>>0];case"i64":return ee[o>>>3];case"float":return De()[o>>>2>>>0];case"double":return be()[o>>>3>>>0];case"*":return ae()[o>>>2>>>0];default:it(`invalid type for getValue: ${p}`)}},i.UTF8ToString=we,i.stringToUTF8=It,i.lengthBytesUTF8=En,function o(){if(0<Ut)qt=o;else if(u)t(i),pn();else{for(;0<Zr.length;)Zr.shift()(i);0<Ut?qt=o:(i.calledRun=!0,re||(pn(),t(i)))}}(),i.PTR_SIZE=4,a}),kd=$i,Ts=globalThis.self?.name?.startsWith("em-pthread"),Ts&&$i()}),wi,fa,Is,Ae,Td,wr,Es,zs,vi,Cs,xi,Id,Si,Ed,Oa=P(()=>{"use strict";Aa(),wi=typeof location>"u"?void 0:location.origin,fa=import.meta.url>"file:"&&import.meta.url<"file;",Is=()=>{if(fa){let e=URL;return new URL(new e("ort.webgpu.bundle.min.mjs",import.meta.url).href,wi).href}return import.meta.url},Ae=Is(),Td=()=>{if(Ae&&!Ae.startsWith("blob:"))return Ae.substring(0,Ae.lastIndexOf("/")+1)},wr=(e,t)=>{try{let r=t??Ae;return(r?new URL(e,r):new URL(e)).origin===wi}catch{return!1}},Es=(e,t)=>{let r=t??Ae;try{return(r?new URL(e,r):new URL(e)).href}catch{return}},zs=(e,t)=>`${t??"./"}${e}`,vi=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Cs=async e=>(await import(e)).default,xi=(Dm(),ar(vd)).default,Id=async()=>{if(!Ae)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(wr(Ae))return[void 0,xi()];let e=await vi(Ae);return[e,xi(e)]},Si=(Pm(),ar(Sd)).default,Ed=async(e,t,r)=>{if(!e&&!t&&Si&&Ae&&wr(Ae))return[void 0,Si];{let i="ort-wasm-simd-threaded.jsep.mjs",a=e??Es(i,t),n=r&&a&&!wr(a,t),s=n?await vi(a):a??zs(i,t);return[n?s:void 0,await Cs(s)]}}}),ki,vr,jt,Ti,As,Os,Rs,Ra,ge,kt=P(()=>{"use strict";Oa(),vr=!1,jt=!1,Ti=!1,As=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},Os=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Rs=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ra=async e=>{if(vr)return Promise.resolve();if(jt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ti)throw new Error("previous call to 'initializeWebAssembly()' failed.");jt=!0;let t=e.initTimeout,r=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Rs())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!Os())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let i=As();r>1&&!i&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+r+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=r=1);let a=e.wasmPaths,n=typeof a=="string"?a:void 0,s=a?.mjs,u=s?.href??s,l=a?.wasm,d=l?.href??l,c=e.wasmBinary,[f,m]=await Ed(u,n,r>1),_=!1,g=[];if(t>0&&g.push(new Promise($=>{setTimeout(()=>{_=!0,$()},t)})),g.push(new Promise(($,x)=>{let v={numThreads:r};if(c)v.wasmBinary=c;else if(d||n)v.locateFile=b=>d??n+b;else if(u&&u.indexOf("blob:")!==0)v.locateFile=b=>new URL(b,u).href;else if(f){let b=Td();b&&(v.locateFile=k=>b+k)}m(v).then(b=>{jt=!1,vr=!0,ki=b,$(),f&&URL.revokeObjectURL(f)},b=>{jt=!1,Ti=!0,x(b)})})),await Promise.race(g),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},ge=()=>{if(vr&&ki)return ki;throw new Error("WebAssembly is not initialized yet.")}}),Ve,Dr,ce,Ba=P(()=>{"use strict";kt(),Ve=(e,t)=>{let r=ge(),i=r.lengthBytesUTF8(e)+1,a=r._malloc(i);return r.stringToUTF8(e,a,i),t.push(a),a},Dr=(e,t,r,i)=>{if(typeof e=="object"&&e!==null){if(r.has(e))throw new Error("Circular reference in options");r.add(e)}Object.entries(e).forEach(([a,n])=>{let s=t?t+a:a;if(typeof n=="object")Dr(n,s+".",r,i);else if(typeof n=="string"||typeof n=="number")i(s,n.toString());else if(typeof n=="boolean")i(s,n?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof n}`)})},ce=e=>{let t=ge(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetLastError(a,a+i);let n=Number(t.getValue(a,i===4?"i32":"i64")),s=t.getValue(a+i,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${n}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(r)}}}),zd,Um=P(()=>{"use strict";kt(),Ba(),zd=e=>{let t=ge(),r=0,i=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log serverity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let n=0;return e?.tag!==void 0&&(n=Ve(e.tag,i)),r=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,n),r===0&&ce("Can't create run options."),e?.extra!==void 0&&Dr(e.extra,"",new WeakSet,(s,u)=>{let l=Ve(s,i),d=Ve(u,i);t._OrtAddRunConfigEntry(r,l,d)!==0&&ce(`Can't set a run config entry: ${s} - ${u}.`)}),[r,i]}catch(n){throw r!==0&&t._OrtReleaseRunOptions(r),i.forEach(s=>t._free(s)),n}}}),Bs,Ms,Ns,Gt,Ds,Cd,qm=P(()=>{"use strict";kt(),Ba(),Bs=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Ms=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Ns=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(r=>(typeof r=="string"?r:r.name)==="webgpu")&&(e.enableMemPattern=!1)},Gt=(e,t,r,i)=>{let a=Ve(t,i),n=Ve(r,i);ge()._OrtAddSessionConfigEntry(e,a,n)!==0&&ce(`Can't set a session config entry: ${t} - ${r}.`)},Ds=async(e,t,r)=>{for(let i of t){let a=typeof i=="string"?i:i.name,n=[];switch(a){case"webnn":if(a="WEBNN",typeof i!="string"){let c=i?.deviceType;c&&Gt(e,"deviceType",c,r)}break;case"webgpu":if(a="JS",typeof i!="string"){let c=i;if(c?.preferredLayout){if(c.preferredLayout!=="NCHW"&&c.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${c.preferredLayout}`);Gt(e,"preferredLayout",c.preferredLayout,r)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let s=Ve(a,r),u=n.length,l=0,d=0;if(u>0){l=ge()._malloc(u*ge().PTR_SIZE),r.push(l),d=ge()._malloc(u*ge().PTR_SIZE),r.push(d);for(let c=0;c<u;c++)ge().setValue(l+c*ge().PTR_SIZE,n[c][0],"*"),ge().setValue(d+c*ge().PTR_SIZE,n[c][1],"*")}await ge()._OrtAppendExecutionProvider(e,s,l,d,u)!==0&&ce(`Can't append execution provider: ${a}.`)}},Cd=async e=>{let t=ge(),r=0,i=[],a=e||{};Ns(a);try{let n=Bs(a.graphOptimizationLevel??"all"),s=Ms(a.executionMode??"sequential"),u=typeof a.logId=="string"?Ve(a.logId,i):0,l=a.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log serverity level is not valid: ${l}`);let d=a.logVerbosityLevel??0;if(!Number.isInteger(d)||d<0||d>4)throw new Error(`log verbosity level is not valid: ${d}`);let c=typeof a.optimizedModelFilePath=="string"?Ve(a.optimizedModelFilePath,i):0;if(r=t._OrtCreateSessionOptions(n,!!a.enableCpuMemArena,!!a.enableMemPattern,s,!!a.enableProfiling,0,u,l,d,c),r===0&&ce("Can't create session options."),a.executionProviders&&await Ds(r,a.executionProviders,i),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);Gt(r,"enableGraphCapture",a.enableGraphCapture.toString(),i)}if(a.freeDimensionOverrides)for(let[f,m]of Object.entries(a.freeDimensionOverrides)){if(typeof f!="string")throw new Error(`free dimension override name must be a string: ${f}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let _=Ve(f,i);t._OrtAddFreeDimensionOverride(r,_,m)!==0&&ce(`Can't set a free dimension override: ${f} - ${m}.`)}return a.extra!==void 0&&Dr(a.extra,"",new WeakSet,(f,m)=>{Gt(r,f,m,i)}),[r,i]}catch(n){throw r!==0&&t._OrtReleaseSessionOptions(r)!==0&&ce("Can't release session options."),i.forEach(s=>t._free(s)),n}}}),At,tt,wt,Ma,Pr,Na,Da,ha,J=P(()=>{"use strict";At=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},tt=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},wt=(e,t)=>{let r=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],i=typeof t=="number"?t:t.reduce((a,n)=>a*n,1);return r>0?Math.ceil(i*r):void 0},Ma=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Pr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Na=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",Da=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",ha=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Pa,Ad=P(()=>{"use strict";Aa(),Pa=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let r=t.headers.get("Content-Length"),i=r?parseInt(r,10):0;if(i<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),n;try{n=new ArrayBuffer(i)}catch(u){if(u instanceof RangeError){let l=Math.ceil(i/65536);n=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw u}let s=0;for(;;){let{done:u,value:l}=await a.read();if(u)break;let d=l.byteLength;new Uint8Array(n,s,d).set(l),s+=d}return new Uint8Array(n,0,i)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Ps,Us,qs,Ws,Ua,Ls,ue,rt=P(()=>{"use strict";J(),Ps=["V","I","W","E","F"],Us=(e,t)=>{console.log(`[${Ps[e]},${new Date().toISOString()}]${t}`)},Ua=(e,t)=>{qs=e,Ws=t},Ls=(e,t)=>{let r=Pr(e),i=Pr(qs);r>=i&&Us(r,typeof t=="function"?t():t)},ue=(...e)=>{Ws&&Ls(...e)}}),Vs,Bt,C,Ur,Od,Rd,Bd,ie=P(()=>{"use strict";Vs=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Bt=class{static calcShape(e,t,r=!1){let i=e.length,a=t.length;if(i===0)return t;if(a===0)return e;let n=Math.max(e.length,t.length),s=new Array(n);if(r){if(i<2||a<2)return;let u=Vs.calcMatMulShape([e[i-2],e[i-1]],[t[a-2],t[a-1]]);if(u===void 0)return;[s[n-2],s[n-1]]=u}for(let u=r?3:1;u<=n;u++){let l=i-u<0?1:e[i-u],d=a-u<0?1:t[a-u];if(l!==d&&l>1&&d>1)return;let c=Math.max(l,d);if(l&&d)s[n-u]=Math.max(l,d);else{if(c>1)return;s[n-u]=0}}return s}static isValidBroadcast(e,t){let r=e.length,i=t.length;if(r>i)return!1;for(let a=1;a<=r;a++)if(e[r-a]!==1&&e[r-a]!==t[i-a])return!1;return!0}},C=class Br{static size(t){return Br.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,r=4){let i=t.length;if(i===0)return[];let a=new Array(i),n=i-1;for(;n>=0;){if(t[n]%r===0){a[n]=t[n]/r;break}if(r%t[n]!==0)throw new Error("cannot convert shape");a[n]=1,r/=t[n],n--}for(n--;n>=0;n--)a[n]=t[n];return a}static sizeFromDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Br.getSizeFromDimensionRange(t,r,t.length)}static sizeToDimension(t,r){if(r<0||r>t.length)throw new Error(`invalid dimension of ${r} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Br.getSizeFromDimensionRange(t,0,r)}static getSizeFromDimensionRange(t,r,i){let a=1;for(let n=r;n<i;n++){if(t[n]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[n])}return a}static computeStrides(t){let r=t.length;if(r===0)return[];if(r===1)return[1];let i=new Array(r);i[r-1]=1,i[r-2]=t[r-1];for(let a=r-3;a>=0;--a)i[a]=i[a+1]*t[a+1];return i}static normalizeAxis(t,r){if(t<-r&&t>=r)throw new Error("unsupported axis for this operation.");return t<0?t+r:t}static normalizeAxes(t,r){return t.map(i=>this.normalizeAxis(i,r??t.length))}static sortBasedOnPerm(t,r){return r?r.map(i=>t[i]):t.slice().reverse()}static padShape(t,r){let i=t.length;return t.map((a,n)=>a+r[n]+r[n+i])}static areEqual(t,r){return t.length!==r.length?!1:t.every((i,a)=>i===r[a])}},Ur=class er{static adjustPoolAttributes(t,r,i,a,n,s){if(!t&&i.length!==r.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<r.length-2;u++)u>=i.length?i.push(r[u+2]):i[u]=r[u+2];for(let u=0;u<i.length;u++)if(u<a.length){if(a[u]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let u=0;u<i.length;u++)if(u<n.length){if(n[u]<0)throw new Error("dilations should be greater than or equal to 1")}else n.push(1);for(let u=0;u<i.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<i.length;u++){if(i[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=i[u]||s[u+i.length]>=i[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,r,i,a,n,s,u){if(u){if(n.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(r.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)er.adjustPadAndReturnShape(t[l+(s?1:2)],r[l],i[l],a[l],n,l,l+t.length-2,u)}}static computePoolOutputShape(t,r,i,a,n,s,u){if(r.length<=0)throw new Error("input shape must be of size greater than 0");let l=[r[0],r[1]];return er.computeShapeHelper(t,r,l,i,a,n,s,u),l}static computeConvOutputShape(t,r,i,a,n,s,u){if(t.length<=0||r.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],r[0]];return er.computeShapeHelper(!1,t,l,i,a,n,s,u),l}static computeShapeHelper(t,r,i,a,n,s,u,l){if(t)for(let d=0;d<r.length-2;d++)i.push(1);else for(let d=0;d<r.length-2;d++)i.push(er.adjustPadAndReturnShape(r[d+2],a[d],n[d],s[d],u,d,d+r.length-2,l))}static adjustPadAndReturnShape(t,r,i,a,n,s,u,l){let d=i*(a-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return n[s]=0,n[u]=0,Math.floor((t-d)/r+1);case"SAME_LOWER":case"SAME_UPPER":if(i!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+r-1)/r-1)*r+a-t;return n[s]=Math.floor(l==="SAME_LOWER"?(c+1)/2:c/2),n[u]=c-n[s],Math.floor((t+c-a)/r+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+n[s]+n[u]-d)/r+1)}},Od=class{static getShapeOfGemmResult(e,t,r,i,a){if(e.length!==2||r.length!==2)throw new Error("shape need to be of size 2");let n,s,u;t?(n=e[1],s=e[0]):(n=e[0],s=e[1]);let l=-1;if(i?(u=r[0],l=1):(u=r[1],l=0),r[l]!==s)throw new Error("dimension mismatch");if(n<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(a&&!Bt.isValidBroadcast(a,[n,u]))throw new Error("gemm: invalid bias shape for broadcast");return[n,u,s]}},Rd=-34028234663852886e22,Bd=34028234663852886e22}),qa,Md=P(()=>{"use strict";J(),qa=(e,t)=>new(Ma(t))(e)}),ma,Ii,js,Ei,Gs,zi,Ci,Ai,Hs,Nd,Wm=P(()=>{"use strict";rt(),ma=(e,t=!0)=>{if(e.byteLength%8!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 8 (BigInt).");let r=e.byteLength/8,i=new BigInt64Array(e.buffer,e.byteOffset,r),a=new Int32Array(r);for(let n=0;n<r;n++){let s=i[n];if(s>2147483647n||s<-2147483648n)throw new Error(`Overflow occurred when converting BigInt to Int32 at index ${n}: ${s}`);a[n]=Number(s)}return t?new Uint8Array(a.buffer):a},Ii=(e,t=!0)=>{if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (Int32).");let r=e.byteLength/4,i=new Int32Array(e.buffer,e.byteOffset,r),a=BigInt64Array.from(i,BigInt);return t?new Uint8Array(a.buffer):a},js=1,Ei=()=>js++,Gs=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),zi=(e,t)=>{let r=Gs.get(e);if(!r)throw new Error("Unsupported data type.");return t.length>0?Math.ceil(t.reduce((i,a)=>i*a)*r/8):0},Ci=class{constructor(e){this.shouldConvertInt64toInt32=!1,this.isInt64ToInt32Converted=!1;let{sessionId:t,context:r,tensor:i,dataType:a,shape:n,shouldConvertInt64toInt32:s=!1}=e;this.sessionId=t,this.mlContext=r,this.mlTensor=i,this.dataType=a,this.tensorShape=n,this.shouldConvertInt64toInt32=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get shape(){return this.tensorShape}get byteLength(){return zi(this.dataType,this.tensorShape)}destroy(){ue("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e,t){if(e){let r=await this.mlContext.readTensor(this.mlTensor),i=Ii(new Uint8Array(r));if(t){(t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength)).set(i);return}else return i.buffer}else return t?this.mlContext.readTensor(this.mlTensor,t):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,r){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===r.length&&this.tensorShape.every((i,a)=>i===r[a])}setIsInt64ToInt32Converted(e){this.isInt64ToInt32Converted=e}},Ai=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,r,i){let a=t,n=this.tensorManager.getMLContext(e),s=a==="int64"&&!n.opSupportLimits().input.dataTypes.includes("int64");if(s&&(a="int32",ue("verbose",()=>"[WebNN] TensorIdTracker.ensureTensor: convert dataType from int64 to int32")),this.wrapper){if(this.wrapper.canReuseTensor(n,a,r))return this.wrapper.tensor;if(i){if(this.wrapper.byteLength!==zi(a,r))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let u=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,a,r,u,!0,!0,s),i&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper)if(this.wrapper.shouldConvertInt64toInt32&&(t=ma(e,!0),this.wrapper.setIsInt64ToInt32Converted(!0)),t.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else ue("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor();this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isInt64ToInt32Converted?Ii(this.activeUpload):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32,e):this.wrapper.read(this.wrapper?.shouldConvertInt64toInt32)}},Hs=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=Ei();return this.tensorTrackersById.set(e,new Ai(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,r,i,a){ue("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${r}, shape: ${i}, copyOld: ${a}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.ensureTensor(e,r,i,a)}upload(e,t){let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");r.upload(t)}async download(e,t){ue("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let r=this.tensorTrackersById.get(e);if(!r)throw new Error("Tensor not found.");return r.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,r,i){let a=this.getMLContext(e),n=Ei(),s=new Ci({sessionId:e,context:a,tensor:t,dataType:r,shape:i});return this.tensorTrackersById.set(n,new Ai(this,s)),this.externalTensors.add(s),n}async getCachedTensor(e,t,r,i,a,n,s=!1){let u=this.getMLContext(e);for(let[d,c]of this.freeTensors.entries())if(c.canReuseTensor(u,t,r)){ue("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, shape: ${r}}`);let f=this.freeTensors.splice(d,1)[0];return f.sessionId=e,f}ue("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, shape: ${r}}`);let l=await u.createTensor({dataType:t,shape:r,dimensions:r,usage:i,writable:a,readable:n});return new Ci({sessionId:e,context:u,tensor:l,dataType:t,shape:r,shouldConvertInt64toInt32:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Nd=(...e)=>new Hs(...e)}),xr,Fs,Dd,Lm=P(()=>{"use strict";J(),kt(),Md(),Wm(),rt(),xr=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Fs=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let r=Object.keys(e).sort(),i=Object.keys(t).sort();return r.length===i.length&&r.every((a,n)=>a===i[n]&&e[a]===t[a])},Dd=class{constructor(e){this.tensorManager=Nd(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.temporaryGraphInputs=[],this.temporarySessionTensorIds=new Map,Ua(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){ue("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){ue("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let r of t)ue("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${r}}`),this.tensorManager.releaseTensorId(r);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let r=this.mlContextCache.findIndex(i=>i.gpuDevice===e);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:i}),i}}else if(e===void 0){let r=this.mlContextCache.findIndex(i=>i.options===void 0&&i.gpuDevice===void 0);if(r!==-1)return this.mlContextCache[r].mlContext;{let i=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:i}),i}}let t=this.mlContextCache.findIndex(r=>Fs(r.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:r}),r}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let r=this.sessionIdsByMLContext.get(t);r||(r=new Set,this.sessionIdsByMLContext.set(t,r)),r.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let r=this.sessionIdsByMLContext.get(t);if(r.delete(e),r.size===0){this.sessionIdsByMLContext.delete(t);let i=this.mlContextCache.findIndex(a=>a.mlContext===t);i!==-1&&this.mlContextCache.splice(i,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){ue("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,r,i,a){let n=xr.get(r);if(!n)throw new Error(`Unsupported ONNX data type: ${r}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,n,i,a)}async createTemporaryTensor(e,t,r){ue("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${r}}`);let i=xr.get(t);if(!i)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,i,r,!1);let n=this.temporarySessionTensorIds.get(e);return n?n.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!ge().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");ue("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let r=await this.tensorManager.download(e);return qa(r,t)}}registerMLTensor(e,t,r,i){let a=xr.get(r);if(!a)throw new Error(`Unsupported ONNX data type: ${r}`);let n=this.tensorManager.registerTensor(e,t,a,i);return ue("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${i}} -> {tensorId: ${n}}`),n}registerMLConstant(e,t,r,i,a,n,s=!1){if(!n)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=n.get(u);if(!l)throw new Error(`File with name ${u} not found in preloaded files.`);if(t+r>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let d=l.slice(t,t+r).buffer,c;switch(a.dataType){case"float32":c=new Float32Array(d);break;case"float16":c=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(d):new Uint16Array(d);break;case"int32":c=new Int32Array(d);break;case"uint32":c=new Uint32Array(d);break;case"int64":s?(c=ma(new Uint8Array(d),!1),a.dataType="int32"):c=new BigInt64Array(d);break;case"uint64":c=new BigUint64Array(d);break;case"int8":c=new Int8Array(d);break;case"int4":case"uint4":case"uint8":c=new Uint8Array(d);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return ue("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),i.constant(a,c)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}isGraphInput(e,t){let r=this.sessionGraphInputs.get(e);return r?r.includes(t):!1}isInt64Supported(e){return!!this.mlContextBySessionId.get(e)?.opSupportLimits().input.dataTypes.includes("int64")}flush(){}}}),Wa=P(()=>{"use strict"}),Oi,Sr,kr,Ks,Zs,Ri,ga,Qs,Pd,Vm=P(()=>{"use strict";rt(),Wa(),Oi=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Sr=[],kr=e=>Math.ceil(Number(e)/16)*16,Ks=e=>{for(let t=0;t<Sr.length;t++){let r=Sr[t];if(e<=r)return r}return Math.ceil(e/16)*16},Zs=1,Ri=()=>Zs++,ga=async(e,t,r,i)=>{let a=kr(r),n=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,n,0,a),e.flush(),await n.mapAsync(GPUMapMode.READ);let u=n.getMappedRange();if(i){let l=i();return l.set(new Uint8Array(u,0,r)),l}else return new Uint8Array(u.slice(0,r))}finally{n.destroy()}},Qs=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of Oi)Sr.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let r=t.buffer,i=t.byteOffset,a=t.byteLength,n=kr(a),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${a}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:n,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(r,i,a)),u.unmap();let d=this.backend.device.createCommandEncoder();d.copyBufferToBuffer(u,0,s.gpuData.buffer,0,n),this.backend.device.queue.submit([d.finish()]),u.destroy(),ue("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let r=this.storageCache.get(e);if(!r)throw new Error("source gpu data for memcpy does not exist");let i=this.storageCache.get(t);if(!i)throw new Error("destination gpu data for memcpy does not exist");if(r.originalSize!==i.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=kr(r.originalSize),n=this.backend.getCommandEncoder();this.backend.endComputePass(),n.copyBufferToBuffer(r.gpuData.buffer,0,i.gpuData.buffer,0,a)}registerExternalBuffer(e,t,r){let i;if(r){if(i=r[0],e===r[1])return ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, buffer is the same, skip.`),i;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else i=Ri();return this.storageCache.set(i,{gpuData:{id:i,type:0,buffer:e},originalSize:t}),ue("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${i}, registered.`),i}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),ue("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let r=Ks(e),i,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,n=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||n){let u=(a?this.freeBuffers:this.freeUniformBuffers).get(r);u?u.length>0?i=u.pop():i=this.backend.device.createBuffer({size:r,usage:t}):i=this.backend.device.createBuffer({size:r,usage:t})}else i=this.backend.device.createBuffer({size:r,usage:t});let s={id:Ri(),type:0,buffer:i};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),ue("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,r=this.storageCache.get(t);if(!r){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return ue("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${r.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(r.gpuData.buffer),r.originalSize}async download(e,t){let r=this.storageCache.get(Number(e));if(!r)throw new Error("data does not exist");await ga(this.backend,r.gpuData.buffer,r.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=Oi.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let r=this.freeBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let r=this.freeUniformBuffers.get(e.size)||[];t===void 0||r.length>=t?e.destroy():r.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(r=>{r.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(ue("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(r=>{r.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Pd=(...e)=>new Qs(...e)}),Xs,pe,$e=P(()=>{"use strict";Xs=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},pe=e=>new Xs(e)}),Mt,Tr,Se,Ie,K,ye,_a,Rt,ct,G,Ht,R,j,Ud,La,Ys,qd,ne=P(()=>{"use strict";J(),ie(),Mt=64,Tr=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Se=(e,t=1)=>{let r=Tr(e,t);return typeof r=="string"?r:r[0]},Ie=(e,t=1)=>{let r=Tr(e,t);return typeof r=="string"?r:r[1]},K=(...e)=>{let t=[];return e.forEach(r=>{r.length!==0&&t.push({type:12,data:r},{type:12,data:C.computeStrides(r)})}),t},ye=e=>e%4===0?4:e%2===0?2:1,_a=(e="f32",t,r="0")=>!t||t===1?`${e}(${r})`:`vec${t}<${e}>(${r})`,Rt=(e,t,r)=>e==="f32"?r:t===1?`f32(${r})`:`vec${t}<f32>(${r})`,ct=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,G=(e,t,r,i)=>e.startsWith("uniforms.")&&r>4?typeof t=="string"?i==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:i==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:r>1?`${e}[${t}]`:e,Ht=(e,t,r,i,a)=>{let n=typeof r=="number",s=n?r:r.length,u=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,d=Tr(t,a),c=typeof d=="string"?d:d[1],f=typeof d=="string"?d:d[0],m={indices:l,value:c,storage:f,tensor:t},_=M=>typeof M=="string"?M:`${M}u`,g={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},$=n?"uniforms.":"",x=`${$}${e}_shape`,v=`${$}${e}_strides`,b="";for(let M=0;M<s-1;M++)b+=`
    let dim${M} = current / ${G(v,M,s)};
    let rest${M} = current % ${G(v,M,s)};
    indices[${M}] = dim${M};
    current = rest${M};
    `;b+=`indices[${s-1}] = current;`;let k=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${b}
    return indices;
  }`,S=M=>(g.offsetToIndices=!0,s<2?M:`o2i_${e}(${M})`),T=[];if(s>=2)for(let M=s-1;M>=0;M--)T.push(`${G(v,M,s)} * (indices[${M}])`);let E=s<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${T.join("+")};
  }`,z=M=>(g.indicesToOffset=!0,s<2?M:`i2o_${e}(${M})`),B=(...M)=>s===0?"0u":`${m.indices}(${M.map(_).join(",")})`,N=(M,W)=>s<2?`${M}`:`${G(M,W,s)}`,V=(M,W,te)=>s<2?`${M}=${te};`:`${G(M,W,s)}=${te};`,Q={},F=(M,W)=>{g.broadcastedIndicesToOffset=!0;let te=`${W.name}broadcastedIndicesTo${e}Offset`;if(te in Q)return`${te}(${M})`;let A=[];for(let ae=s-1;ae>=0;ae--){let De=W.indicesGet("outputIndices",ae+W.rank-s);A.push(`${N(v,ae)} * (${De} % ${N(x,ae)})`)}return Q[te]=`fn ${te}(outputIndices: ${W.type.indices}) -> u32 {
             return ${A.length>0?A.join("+"):"0u"};
           }`,`${te}(${M})`},U=(M,W)=>(()=>{if(m.storage===m.value)return`${e}[${M}]=${W};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${e}[${M}]=vec2<u32>(u32(${W}), select(0u, 0xFFFFFFFFu, ${W} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${e}[${M}]=vec2<u32>(u32(${W}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${e}[${M}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${W}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),ee=M=>(()=>{if(m.storage===m.value)return`${e}[${M}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${e}[${M}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${e}[${M}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${M}] & 0xFFu), bool(${e}[${M}] & 0xFF00u), bool(${e}[${M}] & 0xFF0000u), bool(${e}[${M}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),oe=s<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${c} {
    return ${ee(`i2o_${e}(indices)`)};
  }`,L=s<2?"":(()=>{let M=u.map(te=>`d${te}: u32`).join(", "),W=u.map(te=>`d${te}`).join(", ");return`
  fn get_${e}(${M}) -> ${c} {
    return get_${e}ByIndices(${B(W)});
  }`})(),Y=(...M)=>{if(M.length!==s)throw new Error(`indices length must be ${s}`);let W=M.map(_).join(",");return s===0?ee("0u"):s===1?ee(W[0]):(g.get=!0,g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}(${W})`)},re=M=>s<2?ee(M):(g.getByIndices=!0,g.indicesToOffset=!0,`get_${e}ByIndices(${M})`),X=s<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${c}) {
    ${U(`i2o_${e}(indices)`,"value")}
  }`,fe=s<2?"":(()=>{let M=u.map(te=>`d${te}: u32`).join(", "),W=u.map(te=>`d${te}`).join(", ");return`
  fn set_${e}(${M}, value: ${c}) {
    set_${e}ByIndices(${B(W)}, value);
  }`})();return{impl:()=>{let M=[],W=!1;return g.offsetToIndices&&(M.push(k),W=!0),g.indicesToOffset&&(M.push(E),W=!0),g.broadcastedIndicesToOffset&&(Object.values(Q).forEach(te=>M.push(te)),W=!0),g.set&&(M.push(fe),W=!0),g.setByIndices&&(M.push(X),W=!0),g.get&&(M.push(L),W=!0),g.getByIndices&&(M.push(oe),W=!0),!n&&W&&M.unshift(`const ${x} = ${m.indices}(${r.join(",")});`,`const ${v} = ${m.indices}(${C.computeStrides(r).join(",")});`),M.join(`
`)},type:m,offsetToIndices:S,indicesToOffset:z,broadcastedIndicesToOffset:F,indices:B,indicesGet:N,indicesSet:V,set:(...M)=>{if(M.length!==s+1)throw new Error(`indices length must be ${s}`);let W=M[s];if(typeof W!="string")throw new Error("value must be string");let te=M.slice(0,s).map(_).join(",");return s===0?U("0u",W):s===1?U(te[0],W):(g.set=!0,g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}(${te}, ${W})`)},setByOffset:U,setByIndices:(M,W)=>s<2?U(M,W):(g.setByIndices=!0,g.indicesToOffset=!0,`set_${e}ByIndices(${M}, ${W});`),get:Y,getByOffset:ee,getByIndices:re,usage:i,name:e,strides:v,shape:x,rank:s}},R=(e,t,r,i=1)=>Ht(e,t,r,"input",i),j=(e,t,r,i=1)=>Ht(e,t,r,"output",i),Ud=(e,t,r)=>Ht(e,t,r,"atomicOutput",1),La=(e,t,r,i=1)=>Ht(e,t,r,"internal",i),Ys=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=Mt){let t=typeof e=="number"?e:e[0],r=typeof e=="number"?1:e[1],i=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||r>this.limits.maxComputeWorkgroupSizeY||i>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*r*i>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${r}, ${i}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,n=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*r*i}u + local_idx;`;return`@compute @workgroup_size(${t}, ${r}, ${i})
  fn main(${n}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let r=e.usage==="input"?"read":"read_write",i=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${r}> ${e.name}: array<${i}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,r=1){return this.uniforms.push({name:e,type:t,length:r}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:r,length:i}of this.uniforms)if(i&&i>4)r==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${r}>, ${Math.ceil(i/8)}>`):e.push(`${t}:array<vec4<${r}>, ${Math.ceil(i/4)}>`);else{let a=i==null||i===1?r:`vec${i}<${r}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},qd=(e,t)=>new Ys(e,t)}),Js,Bi,eo,to,ro,io,Re,Wd,Ld,ft=P(()=>{"use strict";J(),ie(),$e(),ne(),Js=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Bi=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),eo=(e,t)=>C.sortBasedOnPerm(e,Bi(e.length,t)),to=(e,t,r,i)=>{let a=`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`;for(let n=0;n<t;++n)a+=`a[${e[n]}]=i[${n}];`;return a+="return a;}"},ro=(e,t)=>{let r=[],i=[];for(let a=0;a<e.length;++a)e[a]!==1&&r.push(e[a]),e[t[a]]!==1&&i.push(t[a]);return{newShape:r,newPerm:i}},io=(e,t)=>{let r=0;for(let i=0;i<e.length;++i)if(t[e[i]]!==1){if(e[i]<r)return!1;r=e[i]}return!0},Re=(e,t)=>{let r=e.dataType,i=e.dims.length,a=Bi(i,t),n=eo(e.dims,a),s=e.dims,u=n,l=i<2||io(a,e.dims),d;if(l)return d=g=>{let $=R("input",r,s,4),x=j("output",r,u,4);return`
  ${g.registerUniform("output_size","u32").declareVariables($,x)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let g=C.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64/4)},programUniforms:[{type:12,data:Math.ceil(g/4)}]}},getShaderSource:d};let{newShape:c,newPerm:f}=ro(e.dims,a),m=C.areEqual(f,[2,3,1]),_=C.areEqual(f,[3,1,2]);if(c.length===2||m||_){s=m?[c[0],c[1]*c[2]]:_?[c[0]*c[1],c[2]]:c,u=[s[1],s[0]];let g=16;return d=$=>{let x=R("a",r,s.length),v=j("output",r,u.length);return`
  ${$.registerUniform("output_size","u32").declareVariables(x,v)}
  var<workgroup> tile : array<array<${v.type.value}, ${g+1}>, ${g}>;
  ${$.mainStart([g,g,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${g} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${g}u + local_id.x;
    let input_row = workgroup_id_x * ${g}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${x.getByIndices(`${x.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${g}u + local_id.x;
    let output_row = workgroup_id_y * ${g}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${v.setByIndices(`${v.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let $=C.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/g),y:Math.ceil(u[0]/g)},programUniforms:[{type:12,data:$},...K(s,u)]}},getShaderSource:d}}return d=g=>{let $=R("a",r,s.length),x=j("output",r,u.length);return`
  ${g.registerUniform("output_size","u32").declareVariables($,x)}

  ${to(a,i,$,x)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${x.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${x.setByOffset("global_idx",$.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let g=C.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...K(s,u)]}},getShaderSource:d}},Wd=(e,t)=>{Js(e.inputs,t.perm),e.compute(Re(e.inputs[0],t.perm))},Ld=e=>pe({perm:e.perm})}),ao,no,so,oo,uo,lo,po,co,fo,ho,Pe,Vd,jd,Gd,Hd,Fd,Kd,Zd,Qd,Xd,Yd,jm=P(()=>{"use strict";J(),ie(),ne(),Va(),ft(),ao={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},no={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},so={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},oo={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},uo=(e,t)=>{let r=[];for(let i=t-e;i<t;++i)r.push(i);return r},lo=(e,t)=>{let r=[],i=e.length;for(let n=0;n<i;n++)t.indexOf(n)===-1&&r.push(e[n]);let a=t.map(n=>e[n]);return[r,a]},po=(e,t)=>{let r=e.length+t.length,i=[],a=0;for(let n=0;n<r;n++)t.indexOf(n)===-1?i.push(e[a++]):i.push(1);return i},co=(e,t)=>{for(let r=0;r<e.length;++r)if(e[e.length-r-1]!==t-1-r)return!1;return!0},fo=(e,t)=>{let r=[];if(!co(e,t)){for(let i=0;i<t;++i)e.indexOf(i)===-1&&r.push(i);e.forEach(i=>r.push(i))}return r},ho=(e,t,r,i,a,n,s)=>{let u=r[0].dims,l=C.size(n),d=C.size(s),c=R("_A",r[0].dataType,u),f=j("output",a,n),m=64;l===1&&(m=256);let _=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,g=$=>`
        ${$.registerUniform("reduceSize","u32").declareVariables(c,f)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${$.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${so[i]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${ao[i]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${no[i]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${f.setByOffset("outputIndex",`${i==="mean"?`${f.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${f.type.storage}(${oo[i]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${m}`,inputDependencies:["type"]},getShaderSource:g,getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:l},programUniforms:[{type:12,data:d}]})}},Pe=(e,t,r,i)=>{let a=e.inputs.length===1?r:ya(e.inputs,r),n=a.axes;n.length===0&&!a.noopWithEmptyAxes&&(n=e.inputs[0].dims.map((_,g)=>g));let s=C.normalizeAxes(n,e.inputs[0].dims.length),u=s,l=e.inputs[0],d=fo(u,e.inputs[0].dims.length);d.length>0&&(l=e.compute(Re(e.inputs[0],d),{inputs:[0],outputs:[-1]})[0],u=uo(u.length,l.dims.length));let[c,f]=lo(l.dims,u),m=c;a.keepDims&&(m=po(c,s)),e.compute(ho(t,a.cacheKey,[l],i,e.inputs[0].dataType,m,f),{inputs:[l]})},Vd=(e,t)=>{Pe(e,"ReduceMeanShared",t,"mean")},jd=(e,t)=>{Pe(e,"ReduceL1Shared",t,"l1")},Gd=(e,t)=>{Pe(e,"ReduceL2Shared",t,"l2")},Hd=(e,t)=>{Pe(e,"ReduceLogSumExpShared",t,"logSumExp")},Fd=(e,t)=>{Pe(e,"ReduceMaxShared",t,"max")},Kd=(e,t)=>{Pe(e,"ReduceMinShared",t,"min")},Zd=(e,t)=>{Pe(e,"ReduceProdShared",t,"prod")},Qd=(e,t)=>{Pe(e,"ReduceSumShared",t,"sum")},Xd=(e,t)=>{Pe(e,"ReduceSumSquareShared",t,"sumSquare")},Yd=(e,t)=>{Pe(e,"ReduceLogSumShared",t,"logSum")}}),Ue,mo,qr,ya,qe,go,_o,yo,bo,$o,wo,vo,xo,So,ko,We,Jd,ep,tp,rp,ip,ap,np,sp,op,up,Va=P(()=>{"use strict";J(),ie(),$e(),ne(),jm(),Ue=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},mo=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],qr=(e,t,r,i,a,n,s=!1,u=!1)=>{let l=[],d=r[0].dims,c=d.length,f=C.normalizeAxes(a,c),m=!u&&f.length===0;d.forEach(($,x)=>{m||f.indexOf(x)>=0?s&&l.push(1):l.push($)});let _=l.length,g=C.size(l);return{name:e,shaderCache:t,getShaderSource:$=>{let x=[],v=R("_A",r[0].dataType,c),b=j("output",n,_),k=i(v,b,f),S=k[2];for(let T=0,E=0;T<c;T++)m||f.indexOf(T)>=0?(s&&E++,S=`for(var j${T}: u32 = 0; j${T} < ${d[T]}; j${T}++) {
                  ${k[2].includes("last_index")?`let last_index = j${T};`:""}
                  ${v.indicesSet("input_indices",T,`j${T}`)}
                  ${S}
                }`):(x.push(`${v.indicesSet("input_indices",T,b.indicesGet("output_indices",E))};`),E++);return`

        ${$.registerUniform("output_size","u32").declareVariables(v,b)}

        ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${v.type.indices};
          let output_indices = ${b.offsetToIndices("global_idx")};

          ${x.join(`
`)}
          ${k[0]}       // init ops for reduce max/min
          ${k[1]}
          ${S}
          ${k[3]}
          ${k.length===4?b.setByOffset("global_idx","value"):k.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:n}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:[{type:12,data:g},...K(d,l)]})}},ya=(e,t)=>{let r=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(i=>r.push(Number(i))),pe({axes:r,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},qe=(e,t,r,i)=>{let a=e.inputs,n=a.length===1?r:ya(a,r);e.compute(qr(t,{hint:n.cacheKey,inputDependencies:["rank"]},[a[0]],n.noopWithEmptyAxes&&n.axes.length===0?mo:i,n.axes,a[0].dataType,n.keepDims,n.noopWithEmptyAxes),{inputs:[0]})},go=(e,t)=>{Ue(e.inputs),qe(e,"ReduceLogSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,"value = log(value);"])},_o=(e,t)=>{Ue(e.inputs),qe(e,"ReduceL1",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += abs(${r.getByIndices("input_indices")});`,""])},yo=(e,t)=>{Ue(e.inputs),qe(e,"ReduceL2",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},bo=(e,t)=>{Ue(e.inputs),qe(e,"ReduceLogSumExp",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += exp(${r.getByIndices("input_indices")});`,"value = log(value);"])},$o=(e,t)=>{Ue(e.inputs),qe(e,"ReduceMax",t,(r,i,a)=>{let n=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(r.indicesSet("input_indices",s,0));return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = max(value, ${r.getByIndices("input_indices")});`,""]})},wo=(e,t)=>{Ue(e.inputs),qe(e,"ReduceMean",t,(r,i,a)=>{let n=1;for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&(n*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${r.getByIndices("input_indices")});`,`let value = ${i.type.value}(sum / ${n});`]})},vo=(e,t)=>{Ue(e.inputs),qe(e,"ReduceMin",t,(r,i,a)=>{let n=[];for(let s=0;s<r.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(`input_indices[${s}] = 0;`);return[`${n.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};`,`value = min(value, ${r.getByIndices("input_indices")});`,""]})},xo=(e,t)=>{Ue(e.inputs),qe(e,"ReduceProd",t,(r,i)=>[`var value = ${i.type.storage}(1);`,"",`value *= ${r.getByIndices("input_indices")};`,""])},So=(e,t)=>{Ue(e.inputs),qe(e,"ReduceSum",t,(r,i)=>[`var value = ${i.type.storage}(0);`,"",`value += ${r.getByIndices("input_indices")};`,""])},ko=(e,t)=>{Ue(e.inputs),qe(e,"ReduceSumSquare",t,(r,i)=>[`var t = ${i.type.value}(0); var value = ${i.type.value}(0);`,"",`t = ${r.getByIndices("input_indices")}; value += t * t;`,""])},We=(e,t,r)=>{if(t.length===0)return r;let i=1,a=1;for(let n=0;n<t.length;n++)t.indexOf(n)===-1?i*=e[n]:a*=e[n];return a<32&&i>1024},Jd=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wo(e,t):Vd(e,t)},ep=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_o(e,t):jd(e,t)},tp=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yo(e,t):Gd(e,t)},rp=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bo(e,t):Hd(e,t)},ip=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$o(e,t):Fd(e,t)},ap=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vo(e,t):Kd(e,t)},np=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xo(e,t):Zd(e,t)},sp=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?So(e,t):Qd(e,t)},op=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?ko(e,t):Xd(e,t)},up=(e,t)=>{We(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?go(e,t):Yd(e,t)}}),Mi,lp,dp,ba,Gm=P(()=>{"use strict";J(),$e(),Va(),Mi=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},lp=(e,t)=>{Mi(e.inputs);let r=(i,a,n)=>{let s=[];for(let u=0;u<i.rank;u++)(n.indexOf(u)>=0||n.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(qr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},dp=(e,t)=>{Mi(e.inputs);let r=(i,a,n)=>{let s=[];for(let u=0;u<i.rank;u++)(n.indexOf(u)>=0||n.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${i.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${i.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(qr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],r,[t.axis],7,t.keepDims),{inputs:[0]})},ba=e=>pe(e)}),To,Ir,Io,Eo,zo,nr,Co,pp,ja=P(()=>{"use strict";J(),ie(),Wa(),ne(),To=(e,t)=>{let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(r.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=r.dims[0],d=r.dims[1],c=r.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(i.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(i.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==i.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let f=a.dims[0]/3,m=f,_=m;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let k of t.qkvHiddenSizes)if(k%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");f=t.qkvHiddenSizes[0],m=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let g=d;if(f!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==f+m+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let $=0;if(s){if(m!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==m/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||($=s.dims[3])}let x=g+$,v=-1,b=0;if(n)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==d||u.dims[3]!==x)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:d,pastSequenceLength:$,kvSequenceLength:g,totalSequenceLength:x,maxSequenceLength:v,inputHiddenSize:c,hiddenSize:f,vHiddenSize:_,headSize:Math.floor(f/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Ir=(e,t,r)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${r?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,Io=(e,t,r,i,a,n,s,u)=>{let l=ye(s?1:n),d=64,c=n/l;c<d&&(d=32);let f=Math.ceil(n/l/d),m=[{type:12,data:t},{type:12,data:r},{type:12,data:i},{type:12,data:a},{type:12,data:c},{type:12,data:f}],_=Se(e.dataType,l),g=Ie(1,l),$=["type"];s&&$.push("type"),u&&$.push("type");let x=v=>{let b=j("x",e.dataType,e.dims,l),k=[b],S=s?R("seq_lens",s.dataType,s.dims):void 0;S&&k.push(S);let T=u?R("total_sequence_length_input",u.dataType,u.dims):void 0;T&&k.push(T);let E=Ie(e.dataType),z=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${d}>;
  var<workgroup> thread_sum: array<f32, ${d}>;
  ${v.registerUniforms(z).declareVariables(...k)}
  ${v.mainStart([d,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Ir(S,T,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${d}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${g}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${g}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${d}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${g}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${g}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${d}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${b.type.value}(${E}(1.0) / ${E}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${g}(x[offset + i]);
        x[offset + i] = ${b.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${b.type.value}(${E}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${d};${_};${l}`,inputDependencies:$},getShaderSource:x,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*r},programUniforms:m})}},Eo=(e,t,r,i,a,n,s,u,l)=>{let d=s+n.kvSequenceLength,c=[n.batchSize,n.numHeads,n.sequenceLength,d],f=e>1&&i,m=n.kvNumHeads?n.kvNumHeads:n.numHeads,_=f?[n.batchSize,m,d,n.headSize]:void 0,g=n.nReps?n.nReps:1,$=n.scale===0?1/Math.sqrt(n.headSize):n.scale,x=ye(n.headSize),v=n.headSize/x,b=12,k={x:Math.ceil(d/b),y:Math.ceil(n.sequenceLength/b),z:n.batchSize*n.numHeads},S=[{type:12,data:n.sequenceLength},{type:12,data:v},{type:12,data:d},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:1,data:$},{type:12,data:s},{type:12,data:n.kvSequenceLength},{type:12,data:g}],T=f&&i&&C.size(i.dims)>0,E=["type","type"];T&&E.push("type"),a&&E.push("type"),u&&E.push("type"),l&&E.push("type");let z=[{dims:c,dataType:t.dataType,gpuDataType:0}];f&&z.push({dims:_,dataType:t.dataType,gpuDataType:0});let B=N=>{let V=R("q",t.dataType,t.dims,x),Q=R("key",r.dataType,r.dims,x),F=[V,Q];if(T){let X=R("past_key",i.dataType,i.dims,x);F.push(X)}a&&F.push(R("attention_bias",a.dataType,a.dims));let U=u?R("seq_lens",u.dataType,u.dims):void 0;U&&F.push(U);let ee=l?R("total_sequence_length_input",l.dataType,l.dims):void 0;ee&&F.push(ee);let oe=j("output",t.dataType,c),L=[oe];f&&L.push(j("present_key",t.dataType,_,x));let Y=Ie(1,x),re=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${b}u;

  var<workgroup> tileQ: array<${V.type.storage}, ${b*b}>;
  var<workgroup> tileK: array<${V.type.storage}, ${b*b}>;
  ${N.registerUniforms(re).declareVariables(...F,...L)}
  ${N.mainStart([b,b,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${g===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${g===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Ir(U,ee,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${T&&f?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${f?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${Y}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${T&&f?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${f?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${Y}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(x){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${x}`)}})()};
        output[outputIdx] = ${oe.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${x};${a!==void 0};${i!==void 0};${e}`,inputDependencies:E},getRunData:()=>({outputs:z,dispatchGroup:k,programUniforms:S}),getShaderSource:B}},zo=(e,t,r,i,a,n,s=void 0,u=void 0)=>{let l=n+a.kvSequenceLength,d=a.nReps?a.nReps:1,c=a.vHiddenSize*d,f=e>1&&i,m=a.kvNumHeads?a.kvNumHeads:a.numHeads,_=f?[a.batchSize,m,l,a.headSize]:void 0,g=[a.batchSize,a.sequenceLength,c],$=12,x={x:Math.ceil(a.vHeadSize/$),y:Math.ceil(a.sequenceLength/$),z:a.batchSize*a.numHeads},v=[{type:12,data:a.sequenceLength},{type:12,data:l},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:c},{type:12,data:n},{type:12,data:a.kvSequenceLength},{type:12,data:d}],b=f&&i&&C.size(i.dims)>0,k=["type","type"];b&&k.push("type"),s&&k.push("type"),u&&k.push("type");let S=[{dims:g,dataType:t.dataType,gpuDataType:0}];f&&S.push({dims:_,dataType:t.dataType,gpuDataType:0});let T=E=>{let z=R("probs",t.dataType,t.dims),B=R("v",r.dataType,r.dims),N=[z,B];b&&N.push(R("past_value",i.dataType,i.dims));let V=s?R("seq_lens",s.dataType,s.dims):void 0;s&&N.push(V);let Q=u?R("total_sequence_length_input",u.dataType,u.dims):void 0;u&&N.push(Q);let F=[j("output",t.dataType,g)];f&&F.push(j("present_value",t.dataType,_));let U=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${$}u;
  var<workgroup> tileQ: array<${z.type.value}, ${$*$}>;
  var<workgroup> tileV: array<${z.type.value}, ${$*$}>;
  ${E.registerUniforms(U).declareVariables(...N,...F)}
  ${E.mainStart([$,$,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${d===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${d===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Ir(V,Q,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${b&&f?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${f?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${z.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${b&&f?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${f?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${i!==void 0};${e}`,inputDependencies:k},getRunData:()=>({outputs:S,dispatchGroup:x,programUniforms:v}),getShaderSource:T}},nr=(e,t,r,i,a,n,s,u,l,d,c=void 0,f=void 0)=>{let m=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),_=m>1?d.pastSequenceLength:0,g=_+d.kvSequenceLength,$=l&&C.size(l.dims)>0?l:void 0,x=[t,r];m>1&&s&&C.size(s.dims)>0&&x.push(s),$&&x.push($),c&&x.push(c),f&&x.push(f);let v=e.compute(Eo(m,t,r,s,$,d,_,c,f),{inputs:x,outputs:m>1?[-1,1]:[-1]})[0];e.compute(Io(v,d.batchSize,d.numHeads,_,d.sequenceLength,g,c,f),{inputs:c&&f?[v,c,f]:[v],outputs:[]});let b=[v,i];m>1&&u&&C.size(u.dims)>0&&b.push(u),c&&b.push(c),f&&b.push(f),e.compute(zo(m,v,i,u,d,_,c,f),{inputs:b,outputs:m>1?[0,2]:[0]})},Co=(e,t)=>{let r=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],i=t.sequenceLength,a=t.inputHiddenSize,n=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],d=[{type:12,data:i},{type:12,data:a},{type:12,data:n},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=f=>{let m=j("output_q",l[0].dataType,r),_=j("output_k",l[0].dataType,r),g=j("output_v",l[0].dataType,r),$=R("input",l[0].dataType,l[0].dims),x=R("weight",l[1].dataType,l[1].dims),v=R("bias",l[2].dataType,l[2].dims),b=$.type.storage,k=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${b}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${b}, ${s*s}>;
  var<workgroup> tileWeightK: array<${b}, ${s*s}>;
  var<workgroup> tileWeightV: array<${b}, ${s*s}>;
  ${f.registerUniforms(k).declareVariables($,x,v,m,_,g)}
  ${f.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${b}(0);
    var valueK = ${b}(0);
    var valueV = ${b}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:r,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:d}),getShaderSource:c},{inputs:l,outputs:[-1,-1,-1]})},pp=(e,t)=>{let r=To(e.inputs,t),[i,a,n]=Co(e,r);return nr(e,i,a,n,e.inputs[4],void 0,void 0,void 0,e.inputs[5],r)}}),Ao,Oo,Ro,cp,Hm=P(()=>{"use strict";Ge(),J(),ie(),$e(),ne(),Ao=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let r=(i,a,n)=>{let s=a.length;if(s!==i.length)throw new Error(`${n}: num dimensions != ${s}`);a.forEach((u,l)=>{if(u!==i[l])throw new Error(`${n}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let i=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);r(e[1].dims,i,"Invalid input scale"),r(e[2].dims,i,"Invalid input B"),r(e[3].dims,i,"Invalid input mean"),r(e[4].dims,i,"Invalid input var")}else r(e[1].dims,[1],"Invalid input scale"),r(e[2].dims,[1],"Invalid input B"),r(e[3].dims,[1],"Invalid input mean"),r(e[4].dims,[1],"Invalid input var")},Oo=(e,t)=>{let{epsilon:r,spatial:i,format:a}=t,n=e[0].dims,s=i?ye(n[n.length-1]):1,u=a==="NHWC"&&n.length>1?s:1,l=C.size(n)/s,d=i,c=d?n.length:n,f=R("x",e[0].dataType,e[0].dims,s),m=R("scale",e[1].dataType,e[1].dims,u),_=R("bias",e[2].dataType,e[2].dims,u),g=R("inputMean",e[3].dataType,e[3].dims,u),$=R("inputVar",e[4].dataType,e[4].dims,u),x=j("y",e[0].dataType,c,s),v=()=>{let k="";if(i)k=`let cOffset = ${n.length===1?"0u":a==="NHWC"?`outputIndices[${n.length-1}] / ${s}`:"outputIndices[1]"};`;else if(a==="NCHW")k=`
            ${x.indicesSet("outputIndices","0","0")}
            let cOffset = ${x.indicesToOffset("outputIndices")};`;else{k=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length-1}];`;for(let S=1;S<m.rank;S++)k+=`cIndices[${S}] = outputIndices[${S}];`;k+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return k},b=k=>`
  const epsilon = ${r};
  ${k.registerUniform("outputSize","u32").declareVariables(f,m,_,g,$,x)}
  ${k.mainStart()}
  ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${x.offsetToIndices(`global_idx * ${s}`)};
    ${v()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${g.getByOffset("cOffset")};
    let inputVar = ${$.getByOffset("cOffset")};
    let x = ${f.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${x.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${i}_${s}`,inputDependencies:d?["rank","type","type","type","type"]:void 0},getShaderSource:b,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d?[{type:12,data:l},...K(n)]:[{type:12,data:l}]})}},Ro=e=>pe(e),cp=(e,t)=>{let{inputs:r,outputCount:i}=e,a=Ro({...t,outputCount:i});if(me.webgpu.validateInputContent&&Ao(r,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Oo(r,a))}}),Bo,Mo,fp,Fm=P(()=>{"use strict";ie(),ne(),Bo=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Mo=e=>{let t=e[0].dims,r=e[0].dims[2],i=C.size(t)/4,a=e[0].dataType,n=R("input",a,t,4),s=R("bias",a,[r],4),u=R("residual",a,t,4),l=j("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(i/64)}}),getShaderSource:d=>`
  const channels = ${r}u / 4;
  ${d.declareVariables(n,s,u,l)}

  ${d.mainStart()}
    ${d.guardAgainstOutOfBoundsWorkgroupSizes(i)}
    let value = ${n.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},fp=e=>{Bo(e.inputs),e.compute(Mo(e.inputs))}}),No,de,hp,mp,gp,_p,yp,bp,$p,wp,vp,Do,xp,Sp,kp,Tp,tr,Ip,Mr,Ep,zp,Cp,Ap,Op,Rp,Bp,Mp,Np,Dp,Pp,Up,qp,Wp,Lp,Vp,Ni,jp,$a,wa,Gp,Hp,Fp,Po,Uo,Kp,Ga=P(()=>{"use strict";J(),ie(),$e(),ne(),No=(e,t,r,i,a,n,s)=>{let u=Math.ceil(t/4),l="";typeof a=="string"?l=`${a}(a)`:l=a("a");let d=R("inputData",r,[u],4),c=j("outputData",i,[u],4),f=[{name:"vec_size",type:"u32"}];return s&&f.push(...s),`
      ${e.registerUniforms(f).declareVariables(d,c)}

  ${n??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${d.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",l)}
  }`},de=(e,t,r,i,a,n=e.dataType,s,u)=>{let l=[{type:12,data:Math.ceil(C.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:d=>No(d,C.size(e.dims),e.dataType,n,r,i,u),getRunData:d=>({outputs:[{dims:e.dims,dataType:n}],dispatchGroup:{x:Math.ceil(C.size(d[0].dims)/64/4)},programUniforms:l})}},hp=e=>{e.compute(de(e.inputs[0],"Abs","abs"))},mp=e=>{e.compute(de(e.inputs[0],"Acos","acos"))},gp=e=>{e.compute(de(e.inputs[0],"Acosh","acosh"))},_p=e=>{e.compute(de(e.inputs[0],"Asin","asin"))},yp=e=>{e.compute(de(e.inputs[0],"Asinh","asinh"))},bp=e=>{e.compute(de(e.inputs[0],"Atan","atan"))},$p=e=>{e.compute(de(e.inputs[0],"Atanh","atanh"))},wp=e=>pe(e),vp=(e,t)=>{let r;switch(t.to){case 10:r="vec4<f16>";break;case 1:r="vec4<f32>";break;case 12:r="vec4<u32>";break;case 6:r="vec4<i32>";break;case 9:r="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(de(e.inputs[0],"Cast",r,void 0,t.cacheKey,t.to))},Do=e=>{let t,r,i=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=i?e[1].getFloat32Array()[0]:-34028234663852886e22,r=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=i?e[1].getUint16Array()[0]:64511,r=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return pe({min:t,max:r})},xp=(e,t)=>{let r=t||Do(e.inputs),i=Ie(e.inputs[0].dataType);e.compute(de(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${i}>(uniforms.min), vec4<${i}>(uniforms.max))`,void 0,r.cacheKey,void 0,[{type:e.inputs[0].dataType,data:r.min},{type:e.inputs[0].dataType,data:r.max}],[{name:"min",type:i},{name:"max",type:i}]),{inputs:[0]})},Sp=e=>{e.compute(de(e.inputs[0],"Ceil","ceil"))},kp=e=>{e.compute(de(e.inputs[0],"Cos","cos"))},Tp=e=>{e.compute(de(e.inputs[0],"Cosh","cosh"))},tr=e=>pe(e),Ip=(e,t)=>{let r=Ie(e.inputs[0].dataType);e.compute(de(e.inputs[0],"Elu",i=>`elu_vf32(${i})`,`
  const elu_alpha_ = ${r}(${t.alpha});

  fn elu_f32(a: ${r}) -> ${r} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${r}>) -> vec4<${r}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},Mr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,Ep=e=>{let t=Ie(e.inputs[0].dataType);e.compute(de(e.inputs[0],"Erf",r=>`erf_vf32(${r})`,Mr(t)))},zp=e=>{e.compute(de(e.inputs[0],"Exp","exp"))},Cp=e=>{e.compute(de(e.inputs[0],"Floor","floor"))},Ap=e=>{let t=Ie(e.inputs[0].dataType);e.compute(de(e.inputs[0],"Gelu",r=>`0.5 * ${r} * (1.0 + erf_vf32(${r} * 0.7071067811865475))`,Mr(t)))},Op=(e,t)=>{let r=Ie(e.inputs[0].dataType);e.compute(de(e.inputs[0],"LeakyRelu",i=>`select(leaky_relu_alpha_ * ${i}, ${i}, ${i} >= vec4<${r}>(0.0))`,`const leaky_relu_alpha_ = ${r}(${t.alpha});`,t.cacheKey))},Rp=e=>{e.compute(de(e.inputs[0],"Not",t=>`!${t}`))},Bp=e=>{e.compute(de(e.inputs[0],"Neg",t=>`-${t}`))},Mp=e=>{e.compute(de(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Np=e=>{let t=Ie(e.inputs[0].dataType);e.compute(de(e.inputs[0],"Relu",r=>`select(vec4<${t}>(0.0), ${r}, ${r} > vec4<${t}>(0.0))`))},Dp=e=>{e.compute(de(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Pp=e=>pe(e),Up=(e,t)=>{let r=Ie(e.inputs[0].dataType);e.compute(de(e.inputs[0],"HardSigmoid",i=>`max(vec4<${r}>(0.0), min(vec4<${r}>(1.0), ${t.alpha} * ${i} + vec4<${r}>(${t.beta})))`,void 0,t.cacheKey))},qp=e=>{e.compute(de(e.inputs[0],"Sin","sin"))},Wp=e=>{e.compute(de(e.inputs[0],"Sinh","sinh"))},Lp=e=>{e.compute(de(e.inputs[0],"Sqrt","sqrt"))},Vp=e=>{e.compute(de(e.inputs[0],"Tan","tan"))},Ni=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,jp=e=>{e.compute(de(e.inputs[0],"Tanh",Ni))},$a=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${Ni("v")};
}
`,wa=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,Gp=e=>{let t=Ie(e.inputs[0].dataType);e.compute(de(e.inputs[0],"FastGelu",wa,$a(t),void 0,e.inputs[0].dataType))},Hp=(e,t)=>{let r=Ie(e.inputs[0].dataType);return e.compute(de(e.inputs[0],"ThresholdedRelu",i=>`select(vec4<${r}>(0.0), ${i}, ${i} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${r}>(${t.alpha});`,t.cacheKey)),0},Fp=e=>{e.compute(de(e.inputs[0],"Log","log"))},Po=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Uo=e=>`quick_gelu_impl(${e})`,Kp=(e,t)=>{let r=Ie(e.inputs[0].dataType);e.compute(de(e.inputs[0],"QuickGelu",Uo,Po(r,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),qo,Wo,Zp,Km=P(()=>{"use strict";ie(),ne(),Ga(),qo=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Wo=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let r=R("input",e[0].dataType,e[0].dims,4),i=R("bias",e[0].dataType,[e[0].dims[2]],4),a=j("output",e[0].dataType,t,4),n=C.size(t)/4,s=Se(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(r,i,a)}

  ${Mr(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Zp=e=>{qo(e.inputs),e.compute(Wo(e.inputs))}}),Lo,Vo,Le,Qp,Xp,Yp,Jp,ec,tc,rc,ic,ac,nc,Zm=P(()=>{"use strict";J(),ie(),ne(),Lo=(e,t,r,i,a,n,s,u,l,d,c,f)=>{let m,_;typeof u=="string"?m=_=(b,k)=>`${u}((${b}),(${k}))`:typeof u=="function"?m=_=u:(m=u.scalar,_=u.vector);let g=j("outputData",c,i.length,4),$=R("aData",l,t.length,4),x=R("bData",d,r.length,4),v;if(a)if(n){let b=C.size(t)===1,k=C.size(r)===1,S=t.length>0&&t[t.length-1]%4===0,T=r.length>0&&r[r.length-1]%4===0;b||k?v=g.setByOffset("global_idx",_(b?`${$.type.value}(${$.getByOffset("0")}.x)`:$.getByOffset("global_idx"),k?`${x.type.value}(${x.getByOffset("0")}.x)`:x.getByOffset("global_idx"))):v=`
            let outputIndices = ${g.offsetToIndices("global_idx * 4u")};
            let offsetA = ${$.broadcastedIndicesToOffset("outputIndices",g)};
            let offsetB = ${x.broadcastedIndicesToOffset("outputIndices",g)};
            ${g.setByOffset("global_idx",_(s||S?$.getByOffset("offsetA / 4u"):`${$.type.value}(${$.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||T?x.getByOffset("offsetB / 4u"):`${x.type.value}(${x.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else v=g.setByOffset("global_idx",_($.getByOffset("global_idx"),x.getByOffset("global_idx")));else{if(!n)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let b=(k,S,T="")=>{let E=`aData[indexA${S}][componentA${S}]`,z=`bData[indexB${S}][componentB${S}]`;return`
            let outputIndices${S} = ${g.offsetToIndices(`global_idx * 4u + ${S}u`)};
            let offsetA${S} = ${$.broadcastedIndicesToOffset(`outputIndices${S}`,g)};
            let offsetB${S} = ${x.broadcastedIndicesToOffset(`outputIndices${S}`,g)};
            let indexA${S} = offsetA${S} / 4u;
            let indexB${S} = offsetB${S} / 4u;
            let componentA${S} = offsetA${S} % 4u;
            let componentB${S} = offsetB${S} % 4u;
            ${k}[${S}] = ${T}(${m(E,z)});
          `};c===9?v=`
            var data = vec4<u32>(0);
            ${b("data",0,"u32")}
            ${b("data",1,"u32")}
            ${b("data",2,"u32")}
            ${b("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:v=`
            ${b("outputData[global_idx]",0)}
            ${b("outputData[global_idx]",1)}
            ${b("outputData[global_idx]",2)}
            ${b("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables($,x,g)}

        ${f??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${v}
      }`},Vo=(e,t,r,i,a,n,s=r.dataType)=>{let u=r.dims.map($=>Number($)??1),l=i.dims.map($=>Number($)??1),d=!C.areEqual(u,l),c=u,f=C.size(u),m=!1,_=!1,g=[d];if(d){let $=Bt.calcShape(u,l,!1);if(!$)throw new Error("Can't perform binary op on the given tensors");c=$.slice(),f=C.size(c);let x=C.size(u)===1,v=C.size(l)===1,b=u.length>0&&u[u.length-1]%4===0,k=l.length>0&&l[l.length-1]%4===0;g.push(x),g.push(v),g.push(b),g.push(k);let S=1;for(let T=1;T<c.length;T++){let E=u[u.length-T],z=l[l.length-T];if(E===z)S*=E;else break}S%4===0?(_=!0,m=!0):(x||v||b||k)&&(m=!0)}else m=!0;return g.push(m),{name:e,shaderCache:{hint:t+g.map($=>$.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:$=>Lo($,u,l,c,m,d,_,a,r.dataType,i.dataType,s,n),getRunData:()=>({outputs:[{dims:c,dataType:s}],dispatchGroup:{x:Math.ceil(f/64/4)},programUniforms:[{type:12,data:Math.ceil(C.size(c)/4)},...K(u,l,c)]})}},Le=(e,t,r,i,a,n)=>{e.compute(Vo(t,a??"",e.inputs[0],e.inputs[1],r,i,n))},Qp=e=>{Le(e,"Add",(t,r)=>`${t}+${r}`)},Xp=e=>{Le(e,"Div",(t,r)=>`${t}/${r}`)},Yp=e=>{Le(e,"Equal",{scalar:(t,r)=>`u32(${t}==${r})`,vector:(t,r)=>`vec4<u32>(${t}==${r})`},void 0,void 0,9)},Jp=e=>{Le(e,"Mul",(t,r)=>`${t}*${r}`)},ec=e=>{let t=R("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Le(e,"Pow",{scalar:(r,i)=>`pow_custom(${r},${i})`,vector:(r,i)=>`pow_vector_custom(${r},${i})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},tc=e=>{Le(e,"Sub",(t,r)=>`${t}-${r}`)},rc=e=>{Le(e,"Greater",{scalar:(t,r)=>`u32(${t}>${r})`,vector:(t,r)=>`vec4<u32>(${t}>${r})`},void 0,void 0,9)},ic=e=>{Le(e,"Less",{scalar:(t,r)=>`u32(${t}<${r})`,vector:(t,r)=>`vec4<u32>(${t}<${r})`},void 0,void 0,9)},ac=e=>{Le(e,"GreaterOrEqual",{scalar:(t,r)=>`u32(${t}>=${r})`,vector:(t,r)=>`vec4<u32>(${t}>=${r})`},void 0,void 0,9)},nc=e=>{Le(e,"LessOrEqual",{scalar:(t,r)=>`u32(${t}<=${r})`,vector:(t,r)=>`vec4<u32>(${t}<=${r})`},void 0,void 0,9)}}),jo,Go,Ho,Fo,sc,oc,Qm=P(()=>{"use strict";J(),ie(),$e(),ne(),jo=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let r=0,i=e[r],a=i.dataType,n=i.dims.length;e.forEach((s,u)=>{if(u!==r){if(s.dataType!==a)throw new Error("input tensors should be one type");if(s.dims.length!==n)throw new Error("input tensors should have the same shape");s.dims.forEach((l,d)=>{if(d!==t&&l!==i.dims[d])throw new Error("non concat dimensions must match")})}})},Go=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Ho=(e,t)=>{let r=e.length,i=[];for(let a=0;a<r;++a){let n=t.setByOffset("global_idx",e[a].getByIndices("indices"));r===1?i.push(n):a===0?i.push(`if (inputIndex == ${a}u) { ${n} }`):a===r-1?i.push(`else { ${n} }`):i.push(`else if (inputIndex == ${a}) { ${n} }`)}return i.join(`
`)},Fo=(e,t,r,i)=>{let a=C.size(r),n=new Array(e.length),s=new Array(e.length),u=0,l=[],d=[],c=[{type:12,data:a}];for(let $=0;$<e.length;++$)u+=e[$].dims[t],n[$]=u,d.push(e[$].dims.length),s[$]=R(`input${$}`,i,d[$]),l.push("rank"),c.push({type:12,data:n[$]});for(let $=0;$<e.length;++$)c.push(...K(e[$].dims));c.push(...K(r));let f=j("output",i,r.length),m=f.indicesGet("indices",t),_=Array.from(Array(n.length).keys()).map($=>`uniforms.sizeInConcatAxis${$}`).join(","),g=$=>`

  ${(()=>{$.registerUniform("outputSize","u32");for(let x=0;x<e.length;x++)$.registerUniform(`sizeInConcatAxis${x}`,"u32");return $.declareVariables(...s,f)})()}

  ${Go(n.length,_)}

  ${$.mainStart()}
    ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${f.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${_});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Ho(s,f)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:r,dataType:i}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:g}},sc=(e,t)=>{let r=e.inputs,i=r[0].dims,a=C.normalizeAxis(t.axis,i.length);jo(r,a);let n=i.slice();n[a]=r.reduce((u,l)=>u+(l.dims.length>a?l.dims[a]:0),0);let s=r.filter(u=>C.size(u.dims)>0);e.compute(Fo(s,a,n,r[0].dataType),{inputs:s})},oc=e=>pe({axis:e.axis})}),vt,xt,St,Ha,Tt=P(()=>{"use strict";J(),ie(),vt=(e,t,r="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${r}(uniforms.clip_min)), ${t}(${r}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${r}(uniforms.alpha) * value + ${r}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${r}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},xt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},St=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Ha=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[r,i]=e?.activation_params||[.2,.5];return{activation:t,alpha:r,beta:i}}else if(t==="Clip"){let[r,i]=e?.activation_params||[Rd,Bd];return{activation:t,clipMax:i,clipMin:r}}else if(t==="LeakyRelu"){let[r]=e?.activation_params||[.01];return{activation:t,alpha:r}}return{activation:t}}}),ke,uc,Fa=P(()=>{"use strict";ke=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},uc=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),lc,Xm=P(()=>{"use strict";lc=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),ir,Ka,Za=P(()=>{"use strict";J(),ie(),ne(),Tt(),ir=(e,t,r,i,a)=>{let n=i-r;return`
      ${Array.from({length:r}).map((s,u)=>`
      if (${G(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,G(a,u+n,i))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},Ka=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,u=e[1].dims,l=s[s.length-2],d=u[u.length-1],c=s[s.length-1],f=ye(d),m=ye(c),_=ye(l),g=C.size(r)/f/_,$=e.length>2,x=i?i.slice(0,-2):r.slice(0,-2),v=[C.size(x),l,d],b=[{type:12,data:g},{type:12,data:l},{type:12,data:d},{type:12,data:c}];xt(t,b),b.push(...K(x,s,u)),$&&b.push(...K(e[2].dims)),b.push(...K(v));let k=S=>{let T=La("batch_dims",e[0].dataType,x.length),E=R("a",e[0].dataType,s.length,m),z=R("b",e[1].dataType,u.length,f),B=j("output",e[0].dataType,v.length,f),N=Se(B.type.tensor),V=vt(t,B.type.value,N),Q=[E,z],F="";if($){let oe=a?f:1;Q.push(R("bias",e[2].dataType,e[2].dims.length,oe)),F=`${a?`value += bias[col / ${oe}];`:`value += ${B.type.value}(bias[row + i]);`}`}let U=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];St(t,U);let ee=()=>{let oe=`var a_data: ${E.type.value};`;for(let L=0;L<m;L++)oe+=`
              let b_data${L} = b[(b_offset + (k + ${L}) * uniforms.N + col) / ${f}];`;for(let L=0;L<_;L++){oe+=`a_data = a[(a_offset + (row + ${L}) * uniforms.K + k) / ${m}];`;for(let Y=0;Y<m;Y++)oe+=`
            values[${L}] = fma(${z.type.value}(a_data${m===1?"":`[${Y}]`}), b_data${Y}, values[${L}]);
`}return oe};return`
  ${S.registerUniforms(U).registerInternalVariables(T).declareVariables(...Q,B)}
  ${S.mainStart()}
    ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${f})) * ${f};
    var index1 = global_idx / (uniforms.N / ${f});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${r.length===2?"":`let batch_indices = ${T.offsetToIndices("batch")};`}

    var a_indices: ${E.type.indices};
    ${ir("a_indices",E,E.rank-2,T.rank,"batch_indices")}
    ${E.indicesSet("a_indices",E.rank-2,0)}
    ${E.indicesSet("a_indices",E.rank-1,0)}
    let a_offset = ${E.indicesToOffset("a_indices")};

    var b_indices: ${z.type.indices};
    ${ir("b_indices",z,z.rank-2,T.rank,"batch_indices")}
    ${z.indicesSet("b_indices",z.rank-2,0)}
    ${z.indicesSet("b_indices",z.rank-1,0)}
    let b_offset = ${z.indicesToOffset("b_indices")};
    var values: array<${B.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
      ${ee()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${F}
      ${V}
      let cur_indices = ${B.type.indices}(batch, row + i, col);
      let offset = ${B.indicesToOffset("cur_indices")};
      ${B.setByOffset(`offset / ${f}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${f};${m};${_};${a}`,inputDependencies:$?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(g/64)},programUniforms:b}),getShaderSource:k}}}),Ko,Zo,va,Di,Qo,xa,Xo,Wr,Qa=P(()=>{"use strict";J(),ie(),ne(),Tt(),Za(),Fa(),Ko=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Zo=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,va=(e,t,r="f32",i,a=!1,n=32,s=!1,u=32)=>{let l=t[1]*e[1],d=t[0]*e[0],c=a?l:n,f=a?n:l,m=c/t[0],_=n/t[1];if(!((a&&m===4&&e[1]===4||!a&&(m===3||m===4))&&c%t[0]===0&&n%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${m} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${r}>, ${c/m}>, ${f}>;
var<workgroup> mm_Bsub: array<array<vec4<${r}>, ${d/e[0]}>, ${n}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${m};
const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${r}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Ko(a,i)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${i?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Zo(a,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Di=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Qo=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",xa=(e,t,r="f32",i,a=!1,n=32,s=!1,u=32,l=!1)=>{let d=e[1]*t[1],c=e[0]*t[0],f=a?d:n,m=a?n:d;if(!(m%t[1]===0&&f%t[0]===0&&n%t[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${f} must be divisible by workgroupSize[0]${t[0]}, tileInner ${n} must be divisible by workgroupSize[1]${t[1]}`);let _=m/t[1],g=f/t[0],$=n/t[1],x=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${d};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${f}; inputCol = inputCol + ${t[0]}) {
          ${Di(a,i)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${i?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${r}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${d};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${g};
let tileRowB = i32(localId.y) * ${$};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${g}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Di(a,i)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${$}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${i?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${r}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Qo(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${r}, ${f}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${r}, ${c}>, ${n}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${i?`let batchIndices = ${i.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${r}, colPerThread>, rowPerThread>;
    ${x}
  }
`},Xo=(e,t,r,i,a=!1)=>{let[n,s,u,l]=i,d=Se(i[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${ke(e,d)} {
      var value = ${ke(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${ir("aIndices",s,s.rank-2,n.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${ke(e,d)} {
      var value = ${ke(e,d)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${ir("bIndices",u,u.rank-2,n.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${ke(e,d)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${ke(e,d)}(bias[row])`};`:""}
        ${r}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Wr=(e,t,r,i,a=!1,n)=>{let s=e[0].dims,u=e[1].dims,l=s.slice(0,-2),d=u.slice(0,-2),c=i?i.slice(0,-2):r.slice(0,-2),f=C.size(c),m=s[s.length-2],_=s[s.length-1],g=u[u.length-1],$=_%4===0&&g%4===0,x=m<=8?[4,1,1]:[4,4,1],v=[8,8,1],b=[Math.ceil(g/v[0]/x[0]),Math.ceil(m/v[1]/x[1]),Math.ceil(f/v[2]/x[2])],k=$?4:1,S=[...l,m,_/k],T=S.length,E=[...d,_,g/k],z=E.length,B=[f,m,g/k],N=[{type:6,data:m},{type:6,data:g},{type:6,data:_}];xt(t,N),N.push(...K(c,S,E));let V=["rank","rank"],Q=e.length>2;Q&&(N.push(...K(e[2].dims)),V.push("rank")),N.push(...K(B));let F=U=>{let ee=c.length,oe=La("batchDims",e[0].dataType,ee,1),L=Se(e[0].dataType),Y=R("a",e[0].dataType,T,k),re=R("b",e[1].dataType,z,k),X=j("result",e[0].dataType,B.length,k),fe=[Y,re];if(Q){let ae=a?k:1;fe.push(R("bias",e[2].dataType,e[2].dims.length,ae))}let M=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];St(t,M);let W=Se(X.type.tensor),te=vt(t,X.type.value,W),A=Xo(k,Q,te,[oe,Y,re,X],a);return`
  ${U.registerUniforms(M).registerInternalVariables(oe).declareVariables(...fe,X)}
  ${A}
  ${$?va(x,v,L,oe):xa(x,v,L,oe)}
                   `};return{name:"MatMul",shaderCache:{hint:`${x};${t.activation};${$};${a}`,inputDependencies:V},getRunData:()=>({outputs:[{dims:n?n(r):r,dataType:e[0].dataType}],dispatchGroup:{x:b[0],y:b[1],z:b[2]},programUniforms:N}),getShaderSource:F}}}),Yo,dc,Ym=P(()=>{"use strict";J(),rt(),ne(),Tt(),Fa(),Xm(),Qa(),Yo=(e,t,r,i,a=!1,n,s=4,u=4,l=4,d="f32")=>{let c=N=>{switch(N){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${d}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},f=N=>{switch(N){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${N} is not supported.`)}},m=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,_=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,g=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",$=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",x=e?"row":"col",v=e?"col":"row",b=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${x} / outWidth;
    let outCol = ${x} % outWidth;

    let WRow = ${v} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${v} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${v} % inChannels;
    var resData = ${ke(s,d)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${g} && xCol >= 0 && xCol < ${$}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,k=e?t&&i?`
    let col = colIn * ${s};
    ${b}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${b}
    }
    return ${ke(s,d)}(0.0);`:i&&r?`
    let col = colIn * ${s};
    ${b}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${b}
    }
    return ${ke(s,d)}(0.0);`,S=e?i&&r?f(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${f(u)}
    }
    return ${ke(u,d)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${f(u)}
    }
    return ${ke(u,d)}(0.0);`,T=ke(l,d),E=ke(e?s:u,d),z=ke(e?u:s,d),B=vt(n,T,d);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${E} {
      ${e?k:S}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?S:k}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${T}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${uc(a)}
      ${B}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},dc=(e,t,r,i,a,n,s,u,l)=>{let d=t.format==="NHWC",c=d?e[0].dims[3]:e[0].dims[1],f=r[0],m=d?r[2]:r[3],_=d?r[1]:r[2],g=d?r[3]:r[1],$=d&&(c%4===0||c%3===0)&&g%4===0,x=d?g:m*_,v=d?m*_:g,b=[8,8,1],k=i<=8?[4,1,1]:[4,4,1],S=[Math.ceil(x/b[0]/k[0]),Math.ceil(v/b[1]/k[1]),Math.ceil(f/b[2]/k[2])];ue("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${S}`);let T=$?d&&c%4!==0?3:4:1,E=b[1]*k[1],z=b[0]*k[0],B=Math.max(b[0]*T,b[1]),N=i%E===0,V=a%z===0,Q=n%B===0,F=$?[T,4,4]:[1,1,1],U=[{type:6,data:i},{type:6,data:a},{type:6,data:n},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];xt(t,U),U.push(...K(e[0].dims,e[1].dims));let ee=["rank","rank"];s&&(U.push(...K(e[2].dims)),ee.push("rank")),U.push(...K(r));let oe=L=>{let Y=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];St(t,Y);let re=$?4:1,X=Se(e[0].dataType),fe=`
      fn setOutputAtIndex(flatIndex : i32, value : ${$?`vec4<${X}>`:X}) {
        result[flatIndex] = ${$?`vec4<${X}>`:X}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${$?`vec4<${X}>`:X}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${$?"/ 4":""}, value);
      }`,M=R("x",e[0].dataType,e[0].dims.length,T===3?1:T),W=R("w",e[1].dataType,e[1].dims.length,re),te=[M,W],A=j("result",e[0].dataType,r.length,re);if(s){let ae=R("bias",e[2].dataType,e[2].dims.length,re);te.push(ae),fe+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${$?`vec4<${X}>`:X} {
          return bias[coords.${d?"w":"y"}${$?"/ 4":""}];
        }`}return`
        ${lc("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${L.registerUniforms(Y).declareVariables(...te,A)}
        ${fe}
        ${Yo(d,N,V,Q,s,t,F[0],F[1],F[2],X)}
        ${$?va(k,b,X,void 0,!d,B):xa(k,b,X,void 0,!d,B,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${T};${$};${N};${V};${Q};${E};${z};${B}`,inputDependencies:ee},getRunData:()=>({outputs:[{dims:l?l(r):r,dataType:e[0].dataType}],dispatchGroup:{x:S[0],y:S[1],z:S[2]},programUniforms:U}),getShaderSource:oe}}}),Jo,Pi,Ft,eu,Ui,tu,pc,cc,Jm=P(()=>{"use strict";J(),rt(),ie(),ne(),Tt(),Fa(),Jo=e=>{let t=1;for(let r=0;r<e.length;r++)t*=e[r];return t},Pi=e=>typeof e=="number"?[e,e,e]:e,Ft=(e,t)=>t<=1?e:e+(e-1)*(t-1),eu=(e,t,r,i=1)=>{let a=Ft(t,i);return Math.floor((e[0]*(r-1)-r+a)/2)},Ui=(e,t,r,i,a)=>{a==null&&(a=eu(e,t[0],i[0]));let n=[0,0,0,r];for(let s=0;s<3;s++)e[s]+2*a>=t[s]&&(n[s]=Math.trunc((e[s]-t[s]+2*a)/i[s]+1));return n},tu=(e,t,r,i,a,n,s,u,l,d)=>{let c,f,m,_;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let g=Ui([t,r,i,1],[u,l,d],1,[a,n,s],e);f=g[0],m=g[1],_=g[2]}else if(Array.isArray(e)){if(!e.every(($,x,v)=>$===v[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let g=Ui([t,r,i,1],[u,l,d],1,[a,n,s],e[0]);f=g[0],m=g[1],_=g[2]}else if(e==="SAME_UPPER"){f=Math.ceil(t/a),m=Math.ceil(r/n),_=Math.ceil(i/s);let g=(f-1)*a+u-t,$=(m-1)*n+l-r,x=(_-1)*s+d-i,v=Math.floor(g/2),b=g-v,k=Math.floor($/2),S=$-k,T=Math.floor(x/2),E=x-T;c={top:k,bottom:S,left:T,right:E,front:v,back:b}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:f,outHeight:m,outWidth:_}},pc=(e,t,r,i,a,n=!1,s="channelsLast")=>{let u,l,d,c,f;if(s==="channelsLast")[u,l,d,c,f]=e;else if(s==="channelsFirst")[u,f,l,d,c]=e;else throw new Error(`Unknown dataFormat ${s}`);let[m,,_,g,$]=t,[x,v,b]=Pi(r),[k,S,T]=Pi(i),E=Ft(_,k),z=Ft(g,S),B=Ft($,T),{padInfo:N,outDepth:V,outHeight:Q,outWidth:F}=tu(a,l,d,c,x,v,b,E,z,B),U=n?m*f:m,ee=[0,0,0,0,0];return s==="channelsFirst"?ee=[u,U,V,Q,F]:s==="channelsLast"&&(ee=[u,V,Q,F,U]),{batchSize:u,dataFormat:s,inDepth:l,inHeight:d,inWidth:c,inChannels:f,outDepth:V,outHeight:Q,outWidth:F,outChannels:U,padInfo:N,strideDepth:x,strideHeight:v,strideWidth:b,filterDepth:_,filterHeight:g,filterWidth:$,effectiveFilterDepth:E,effectiveFilterHeight:z,effectiveFilterWidth:B,dilationDepth:k,dilationHeight:S,dilationWidth:T,inShape:e,outShape:ee,filterShape:t}},cc=(e,t,r,i,a,n)=>{let s=n==="channelsLast",u=s?e[0].dims[3]:e[0].dims[1],l=!1,d=[64,1,1],c={x:r.map((b,k)=>k)},f=[Math.ceil(Jo(c.x.map(b=>r[b]))/d[0]),1,1];ue("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${f}`);let m=l?s&&u%4!==0?3:4:1,_=C.size(r),g=[{type:12,data:_},{type:12,data:i},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];xt(t,g),g.push(...K(e[0].dims,e[1].dims));let $=["rank","rank"],x=e.length===3;x&&(g.push(...K(e[2].dims)),$.push("rank")),g.push(...K(r));let v=b=>{let k=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:i.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];St(t,k);let S=l?4:1,T=Se(e[0].dataType),E=R("x",e[0].dataType,e[0].dims.length,m===3?1:m),z=R("W",e[1].dataType,e[1].dims.length,S),B=[E,z],N=j("result",e[0].dataType,r.length,S),V="";if(x){let U=R("bias",e[2].dataType,e[2].dims.length,S);B.push(U),V+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${T}>`:T} {
          return bias[${s?G("coords",4,5):G("coords",1,5)}${l?"/ 4":""}];
        }`}let Q=ke(m,T),F=vt(t,Q,T);return`
            ${V}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${E.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${z.getByIndices("aIndices")};
            }
          ${b.registerUniforms(k).declareVariables(...B,N)}
          ${b.mainStart()}
          ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${N.offsetToIndices("global_idx")};
              let batch = ${G("coords",0,E.rank)};
              let d2 = ${s?G("coords",E.rank-1,E.rank):G("coords",1,E.rank)};
              let xFRCCorner = vec3<u32>(${s?G("coords",1,E.rank):G("coords",2,E.rank)},
              ${s?G("coords",2,E.rank):G("coords",3,E.rank)},
              ${s?G("coords",3,E.rank):G("coords",4,E.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?G("uniforms.x_shape",1,E.rank):G("uniforms.x_shape",2,E.rank)};
              let xShapeZ = ${s?G("uniforms.x_shape",2,E.rank):G("uniforms.x_shape",3,E.rank)};
              let xShapeW = ${s?G("uniforms.x_shape",3,E.rank):G("uniforms.x_shape",4,E.rank)};
              let xShapeU = ${s?G("uniforms.x_shape",4,E.rank):G("uniforms.x_shape",1,E.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${x?"value = value + getBiasByOutputCoords(coords)":""};
              ${F}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${m};${x}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:f[0],y:f[1],z:f[2]},programUniforms:g}),getShaderSource:v}}}),fc,hc,eg=P(()=>{"use strict";J(),ie(),ne(),Tt(),fc=(e,t,r,i)=>{let a=e.length>2,n=a?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,l=t.format==="NHWC",d=l?r[3]:r[1],c=d/t.group,f=l&&c>=4?ye(d):1,m=C.size(r)/f,_=[{type:12,data:m},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];xt(t,_),_.push(...K(s,[u[0],u[1],u[2],u[3]/f]));let g=a?["rank","rank","rank"]:["rank","rank"];_.push(...K([r[0],r[1],r[2],r[3]/f]));let $=x=>{let v=j("output",e[0].dataType,r.length,f),b=Se(v.type.tensor),k=vt(t,v.type.value,b),S=R("x",e[0].dataType,s.length),T=R("w",e[1].dataType,u.length,f),E=[S,T];a&&E.push(R("b",e[2].dataType,e[2].dims,f));let z=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];St(t,z);let B=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${S.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${T.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${S.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${T.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${x.registerUniforms(z).declareVariables(...E,v)}

  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${v.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${f} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${v.type.value} = ${v.type.value}(0);
    ${B}
    ${n}
    ${k}
    ${v.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${f}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:_}),getShaderSource:$}},hc=(e,t,r,i)=>{let a=e.length>2,n=ye(r[3]),s=ye(r[2]),u=C.size(r)/n/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/n],d=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/n],c=[r[0],r[1],r[2],r[3]/n],f=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];xt(t,f),f.push(...K(l,d,c));let m=(s-1)*t.strides[1]+d[1],_=g=>{let $=j("output",e[0].dataType,c.length,n),x=Se($.type.tensor),v=vt(t,$.type.value,x),b=R("x",e[0].dataType,l.length,n),k=R("w",e[1].dataType,d.length,n),S=[b,k];a&&S.push(R("b",e[2].dataType,e[2].dims,n));let T=a?"value += b[output_channel];":"",E=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return St(t,E),`
  ${g.registerUniforms(E).declareVariables(...S,$)}
  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${b.type.value}, ${m}>;
    var values: array<${$.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${d[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${m}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${b.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${b.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${d[1]}; w_width++) {
          let w_val = ${k.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${T}
      ${v}
      ${$.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${n};${s};${m};${d[0]};${d[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:i?i(r):r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:f}),getShaderSource:_}}}),ru,Er,iu,zr,Sa,qi,au,nu,ka,tg=P(()=>{"use strict";ie(),Ym(),Jm(),Qa(),eg(),Tt(),Za(),ft(),ru=(e,t,r,i,a,n)=>{let s=e[0],u=e.slice(n?1:2,n?3:4),l=u.length,d=t[0],c=t.slice(2).map((m,_)=>m+(m-1)*(r[_]-1)),f=u.map((m,_)=>m+i[_]+i[_+l]).map((m,_)=>Math.floor((m-c[_]+a[_])/a[_]));return f.splice(0,0,s),f.splice(n?3:1,0,d),f},Er=[2,3,1,0],iu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[1]*t.group;if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},zr=(e,t)=>{let r=e.kernelShape.slice();r.length<t[1].dims.length-2&&r.push(...Array(t[1].dims.length-2-r.length).fill(0));for(let n=2;n<t[1].dims.length;++n)r[n-2]===0&&(r[n-2]=t[1].dims[n]);let i=e.pads.slice();Ur.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,r,i,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:r,pads:i}),a},Sa=e=>{let t=Ha(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,n=e.group,s=e.kernel_shape,u=e.pads,l=e.strides,d=e.w_is_const();return{autoPad:i,format:r,dilations:a,group:n,kernelShape:s,pads:u,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},qi=(e,t,r,i)=>{let a=r.format==="NHWC",n=ru(t[0].dims,t[1].dims,r.dilations,r.pads,r.strides,a);if(r.group!==1){let E=[t[0]];if(a){let z=e.kernelCustomData.wT??e.compute(Re(t[1],Er),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),E.push(z)}else E.push(t[1]);t.length===3&&E.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===r.group&&t[1].dims[1]===1&&r.dilations[0]===1&&r.dilations[1]===1?e.compute(hc(E,r,n,i),{inputs:E}):e.compute(fc(E,r,n,i),{inputs:E});return}let s=t.length===3,u=t[0].dims[a?1:2],l=t[0].dims[a?2:3],d=t[0].dims[a?3:1],c=t[1].dims[2],f=t[1].dims[3],m=n[a?1:2],_=n[a?2:3],g=n[a?3:1],$=a&&c===u&&f===l&&r.pads[0]===0&&r.pads[1]===0;if($||c===1&&f===1&&r.dilations[0]===1&&r.dilations[1]===1&&r.strides[0]===1&&r.strides[1]===1&&r.pads[0]===0&&r.pads[1]===0){let E=n[0],z,B,N,V=[];if(a){let U=e.kernelCustomData.wT??e.compute(Re(t[1],Er),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];if(r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=U),$){let ee=u*l*d;z=t[0].reshape([1,E,ee]),B=U.reshape([1,ee,g]),N=[1,E,g]}else z=t[0].reshape([E,u*l,d]),B=U.reshape([1,d,g]),N=[E,m*_,g];V.push(z),V.push(B)}else z=t[0].reshape([E,d,u*l]),B=t[1].reshape([1,g,d]),N=[E,g,m*_],V.push(B),V.push(z);s&&V.push(t[2]);let Q=N[2],F=V[0].dims[V[0].dims.length-1];Q<8&&F<8?e.compute(Ka(V,r,n,N,a,i),{inputs:V}):e.compute(Wr(V,r,n,N,a,i),{inputs:V});return}let x=!0,v=e.kernelCustomData.wT??e.compute(Re(t[1],Er),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=v);let b=[t[0],v];s&&b.push(t[2]);let k=a?m*_:g,S=a?g:m*_,T=c*f*d;e.compute(dc(b,r,n,k,S,T,s,x,i),{inputs:b})},au=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],n=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=zr({...t,pads:a,strides:n,dilations:s,kernelShape:u},i);qi(e,i,l,d=>r?[d[0],d[2],d[3]]:[d[0],d[1],d[3]])},nu=(e,t,r)=>{let i=r.format==="NHWC"?"channelsLast":"channelsFirst",a=zr(r,t),n=r.autoPad==="NOTSET"?r.pads:r.autoPad,s=pc(t[0].dims,t[1].dims,r.strides,r.dilations,n,!1,i);e.compute(cc(t,a,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],i))},ka=(e,t)=>{if(iu(e.inputs,t),e.inputs[0].dims.length===3)au(e,t);else if(e.inputs[0].dims.length===5)nu(e,e.inputs,t);else{let r=zr(t,e.inputs);qi(e,e.inputs,r)}}}),mc,rg=P(()=>{"use strict";J(),rt(),ie(),ne(),mc=(e,t,r)=>{let i=e.length>2,a=t.outputShape,n=t.format==="NHWC",s=t.group,u=e[1].dims,l=u[2]/s,d=u[3],c=n?ye(l):1,f=n&&d===1&&l>=4,m=f?Math.floor(l/4)*4:Math.floor(l/c)*c,_=l-m,g=n?ye(d):1,$=n?d===1?c:g:1,x=C.size(a)/g,v=[Math.ceil(x/64),1,1];ue("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${v}`);let b=["rank","rank"],k=[t.strides[0],t.strides[1]],S=[t.kernelShape[n?1:2],t.kernelShape[n?2:3]],T=[t.dilations[0],t.dilations[1]],E=[S[0]+(t.dilations[0]<=1?0:(t.kernelShape[n?1:2]-1)*(t.dilations[0]-1)),S[1]+(t.dilations[1]<=1?0:(t.kernelShape[n?2:3]-1)*(t.dilations[1]-1))],z=[E[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),E[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],B=[{type:12,data:x},{type:12,data:k},{type:12,data:S},{type:12,data:T},{type:12,data:E},{type:6,data:z},{type:12,data:m},{type:12,data:l},{type:12,data:d},...K(e[0].dims,e[1].dims)];i&&(B.push(...K(e[2].dims)),b.push("rank")),B.push(...K(a));let N=V=>{let Q=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:k.length},{name:"filter_dims",type:"u32",length:S.length},{name:"dilations",type:"u32",length:S.length},{name:"effective_filter_dims",type:"u32",length:E.length},{name:"pads",type:"i32",length:z.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],F=Se(e[0].dataType),U=n?1:2,ee=n?2:3,oe=n?3:1,L=R("W",e[1].dataType,e[1].dims.length,$),Y=R("Dy",e[0].dataType,e[0].dims.length,c),re=[Y,L];i&&re.push(R("bias",e[2].dataType,[a[oe]].length,g));let X=j("result",e[0].dataType,a.length,g),fe=()=>{let te="";if(f)c===4?te+=`
        let xValue = ${Y.getByOffset("x_offset")};
        let wValue = ${L.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?te+=`
          dotProd = dotProd + dot(vec4<${F}>(${Y.getByOffset("x_offset")}, ${Y.getByOffset("x_offset + 1u")}), vec4<${F}>(${L.getByOffset("w_offset")}, ${L.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(te+=`
          dotProd = dotProd + dot(vec4<${F}>(${Y.getByOffset("x_offset")}, ${Y.getByOffset("x_offset + 1u")}, ${Y.getByOffset("x_offset + 2u")}, ${Y.getByOffset("x_offset + 3u")}), vec4<${F}>(${L.getByOffset("w_offset")}, ${L.getByOffset("w_offset + 1u")}, ${L.getByOffset("w_offset + 2u")}, ${L.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(te+=`
                  let xValue = ${n?Y.getByOffset(`${Y.indicesToOffset(`${Y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):Y.get("batch","inputChannel","idyR","idyC")};
        `,c===1)te+=`
          let w_offset = ${L.indicesToOffset(`${L.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${L.getByOffset(`w_offset / ${$}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let A=0;A<c;A++)te+=`
            let wValue${A} = ${L.getByOffset(`${L.indicesToOffset(`${L.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${A}, wOutChannel)`)} / ${$}`)};
            dotProd = dotProd + xValue[${A}] * wValue${A};`;return te},M=()=>{if(_===0)return"";if(!f)throw new Error(`packInputAs4 ${f} is not true.`);let te="";if(c===1){te+="dotProd = dotProd";for(let A=0;A<_;A++)te+=`
            + ${Y.getByOffset(`x_offset + ${A}`)} * ${L.getByOffset(`w_offset + ${A}`)}`;te+=";"}else if(c===2){if(_!==2)throw new Error(`Invalid inputChannelsRemainder ${_}.`);te+=`
          let xValue = ${Y.getByOffset("x_offset")};
          let wValue = ${L.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return te},W=`
            let outputIndices = ${X.offsetToIndices(`global_idx * ${g}`)};
            let batch = ${X.indicesGet("outputIndices",0)};
            let d1 = ${X.indicesGet("outputIndices",oe)};
            let r = ${X.indicesGet("outputIndices",U)};
            let c = ${X.indicesGet("outputIndices",ee)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${X.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${F}(dyRCorner) + ${F}(wR)) / ${F}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${F}(uniforms.Dy_shape[${U}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${F}(dyCCorner) + ${F}(wC)) / ${F}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${F}(uniforms.Dy_shape[${ee}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${f?`
                var x_offset = ${Y.indicesToOffset(`${Y.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${L.indicesToOffset(`${L.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${$};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${f?4:c}) {
                  ${fe()}
                  inputChannel = inputChannel + ${f?4:c};
                }
                ${M()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${i?` + bias[d1 / ${g}]`:""};
            ${X.setByOffset("global_idx","value")};
          `;return`
    ${V.registerUniforms(Q).declareVariables(...re,X)}
      ${V.mainStart()}
      ${V.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${W}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${$}${g}${f}${_}`,inputDependencies:b},getRunData:()=>({dispatchGroup:{x:v[0],y:v[1],z:v[2]},outputs:[{dims:r?r(a):a,dataType:e[0].dataType}],programUniforms:B}),getShaderSource:N}}}),su,ou,uu,Wi,gc,lu,Li,du,_c,ig=P(()=>{"use strict";rg(),Tt(),ft(),su=(e,t,r,i,a,n)=>(e-1)*t+r+(i-1)*a+1-n,ou=(e,t,r,i,a)=>{let n=Math.floor(e/2);t==="SAME_UPPER"?(r[i]=n,r[a]=e-n):t==="SAME_LOWER"&&(r[i]=e-n,r[a]=n)},uu=(e,t,r,i,a,n,s,u,l,d)=>{let c=e.length-2,f=d.length===0;l.length<c&&l.push(...Array(c-l.length).fill(0));let m=e[0],_=t[u?3:1]*a;for(let g=0,$=e.length-c-(u?1:0);g<c;++g,++$){let x=e[$],v=f?x*s[g]:d[g],b=su(x,s[g],n[g],t[$],r[g],v);ou(b,i,n,g,g+c),f&&d.push(s[g]*(x-1)+l[g]+(t[$]-1)*r[g]+1-n[g]-n[g+c])}d.splice(0,0,m),d.splice(u?3:1,0,_)},Wi=(e,t)=>{let r=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((f,m)=>f*m,1)===0){r.length=0;for(let f=2;f<t[1].dims.length;++f)r.push(t[1].dims[f])}let i=e.format==="NHWC";r.splice(0,0,t[1].dims[0]),r.splice(i?3:1,0,t[1].dims[1]);let a=e.pads.slice(),n=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();if(l.reduce((f,m)=>f+m,0)===0){let f=t[0].dims.length-2;l=new Array(f).fill(1)}let d=e.strides.slice();if(d.reduce((f,m)=>f+m,0)===0){let f=t[0].dims.length-2;d=new Array(f).fill(1)}uu(u,r,l,e.autoPad,e.group,a,d,i,s,n);let c=Object.assign({},e);return Object.assign(c,{kernelShape:r,pads:a,outputPadding:s,outputShape:n,dilations:l,strides:d}),c},gc=e=>{let t=Ha(e),r=e.format,i=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,n=e.group,s=e.kernelShape,u=e.pads,l=e.strides,d=e.wIsConst(),c=e.outputPadding,f=e.outputShape;return{autoPad:i,format:r,dilations:a,group:n,kernelShape:s,outputPadding:c,outputShape:f,pads:u,strides:l,wIsConst:d,...t,cacheKey:`${e.format};${t.activation};`}},lu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let r=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],i=e[1].dims[0];if(r!==i)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.reduce((s,u)=>s+u,0)>0&&t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.reduce((s,u)=>s+u,0)>0&&t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.reduce((s,u)=>s+u,0)>0&&t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.outputPadding.length!==n&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${n}D`);if(t.kernelShape.reduce((s,u)=>s+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Li=(e,t,r,i)=>{let a=e.kernelCustomData.wT??e.compute(Re(t[1],[2,3,0,1]),{inputs:[1],outputs:[r.wIsConst?-2:-1]})[0];r.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let n=[t[0],a];t.length===3&&n.push(t[2]),e.compute(mc(n,r,i),{inputs:n})},du=(e,t)=>{let r=t.format==="NHWC",i=[e.inputs[0].reshape(r?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&i.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let n=t.dilations;(n.length===0||n[0]===0)&&(n=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),n=[1].concat(n),a=[1].concat(a);let l=t.outputPadding;l=[0].concat(l);let d=Wi({...t,pads:u,strides:s,dilations:n,kernelShape:a,outputPadding:l},i);Li(e,i,d,c=>r?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},_c=(e,t)=>{if(lu(e.inputs,t),e.inputs[0].dims.length===3)du(e,t);else{let r=Wi(t,e.inputs);Li(e,e.inputs,r)}}}),pu,yc,bc,ag=P(()=>{"use strict";J(),ie(),$e(),ne(),pu=(e,t,r,i)=>{let a=C.size(t),n=t.length,s=R("input",e,n),u=j("output",e,n),l=r.dataType===6?r.getInt32Array()[0]:Number(r.getBigInt64Array()[0]),d=C.normalizeAxis(l,n),c=f=>{let m=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,_=G("uniforms.input_shape","uniforms.axis",n),g=i.reverse?m+(i.exclusive?" + 1":""):"0",$=i.reverse?_:m+(i.exclusive?"":" + 1");return`
                ${f.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${f.mainStart()}
                  ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${g};
                  let last : i32 = ${$};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:i.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:d},...K(t,t)]}),getShaderSource:c}},yc=(e,t)=>{let r=e.inputs[0].dims,i=e.inputs[0].dataType,a=e.inputs[1];e.compute(pu(i,r,a,t),{inputs:[0]})},bc=e=>{let t=e.exclusive===1,r=e.reverse===1;return pe({exclusive:t,reverse:r})}}),cu,fu,hu,$c,wc,ng=P(()=>{"use strict";J(),ie(),$e(),ne(),cu=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},fu=(e,t,r,i)=>{let a=[];a.push(`fn perm(i: ${i.type.indices}) -> ${r.type.indices} {
    var a: ${r.type.indices};`);for(let n=0;n<t;++n)a.push(r.indicesSet("a",e[n],`i[${n}]`));return a.push("return a;}"),a.join(`
`)},hu=(e,t)=>{let r,i,a,n,s,u,l=t.format==="NHWC",d=t.blocksize,c=t.mode==="DCR";l?([r,i,a,n]=e.dims,s=c?[r,i,a,d,d,n/d**2]:[r,i,a,n/d**2,d,d],u=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([r,i,a,n]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=c?[r,d,d,n/d**2,i,a]:[r,n/d**2,d,d,i,a],u=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let f=e.reshape(s),m=f.dims.length,_=e.dataType,g=R("a",_,m),$=j("output",_,m),x=v=>`
  ${v.registerUniform("output_size","u32").declareVariables(g,$)}

  ${fu(u,m,g,$)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${$.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${$.setByOffset("global_idx",g.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:v=>{let b=l?[r,i*d,a*d,n/d**2]:[r,n/d**2,i*d,a*d],k=C.size(b),S=f.dims,T=C.sortBasedOnPerm(S,u);return{outputs:[{dims:b,dataType:v[0].dataType}],dispatchGroup:{x:Math.ceil(k/64)},programUniforms:[{type:12,data:k},...K(S,T)]}},getShaderSource:x}},$c=(e,t)=>{cu(e.inputs),e.compute(hu(e.inputs[0],t))},wc=e=>pe({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Cr,Kt,Vi,mu,gu,_u,yu,ji,bu,vc,xc,sg=P(()=>{"use strict";J(),ie(),$e(),ne(),Cr="[a-zA-Z]|\\.\\.\\.",Kt="("+Cr+")+",Vi="^"+Kt+"$",mu="("+Kt+",)*"+Kt,gu="^"+mu+"$",_u=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let r=this.symbolToIndices.get(e);r===void 0?r=[t]:r.push(t),this.symbolToIndices.set(e,r)}},yu=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[r,i]=t.includes("->")?t.split("->",2):[t,""];if(!r.match(RegExp(gu)))throw new Error("Invalid LHS term");if(r.split(",").forEach((a,n)=>{let s=e[n].dims.slice();if(!a.match(RegExp(Vi)))throw new Error("Invalid LHS term");let u=this.processTerm(a,!0,s,n);this.lhs.push(u)}),i==="")i+=[...this.symbolToInfo.entries()].filter(([a,n])=>n.count===1||a==="...").map(([a])=>a).join("");else if(!i.match(RegExp(Kt)))throw new Error("Invalid RHS");i.match(RegExp(Cr,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let n=this.symbolToInfo.get(a);if(n===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(n.dimValue)}}),this.rhs=this.processTerm(i,!1,this.outputDims)}addSymbol(e,t,r){let i=this.symbolToInfo.get(e);if(i!==void 0){if(i.dimValue!==t&&i.count!==1)throw new Error("Dimension mismatch");i.count++,i.inputIndices.push(r)}else i={count:1,dimValue:t,inputIndices:[r]};this.symbolToInfo.set(e,i)}processTerm(e,t,r,i=-1){let a=r.length,n=!1,s=[],u=0;if(!e.match(RegExp(Vi))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Cr,"g")),d=new _u(i);return l?.forEach((c,f)=>{if(c==="..."){if(n)throw new Error("Only one ellipsis is allowed per input term");n=!0;let m=a-l.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(s=r.slice(u,u+m),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let _=0;_<s.length;_++){let g=String.fromCharCode(48+_);d.addSymbol(g,f+_),this.addSymbol(g,r[u++],i)}}else d.addSymbol(c,f+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,r[u++],i)}),d}},ji=e=>e+"_max",bu=(e,t,r,i)=>{let a=e.map(d=>d.length).map((d,c)=>R(`input${c}`,t,d)),n=C.size(i),s=j("output",t,i.length),u=[...r.symbolToInfo.keys()].filter(d=>!r.rhs.symbolToIndices.has(d)),l=d=>{let c=[],f="var prod = 1.0;",m="var sum = 0.0;",_="sum += prod;",g=[],$=[],x=[],v=[],b=r.symbolToInfo.size===r.rhs.symbolToIndices.size;r.symbolToInfo.forEach((S,T)=>{if(r.rhs.symbolToIndices.has(T)){let E=r.rhs.symbolToIndices.get(T)?.[0];E!==void 0&&r.lhs.forEach((z,B)=>{if(S.inputIndices.includes(B)){let N=z.symbolToIndices.get(T);if(N===void 0)throw new Error("Invalid symbol error");N.forEach(V=>{c.push(`${a[B].indicesSet(`input${B}Indices`,V,s.indicesGet("outputIndices",E))}`)})}})}else r.lhs.forEach((E,z)=>{if(S.inputIndices.includes(z)){let B=E.symbolToIndices.get(T);if(B===void 0)throw new Error("Invalid symbol error");B.forEach(N=>{g.push(`${a[z].indicesSet(`input${z}Indices`,N,`${T}`)}`)}),v.push(`prod *= ${a[z].getByIndices(`input${z}Indices`)};`)}}),$.push(`for(var ${T}: u32 = 0; ${T} < uniforms.${ji(T)}; ${T}++) {`),x.push("}")});let k=b?[...c,`let sum = ${a.map((S,T)=>S.getByIndices(`input${T}Indices`)).join(" * ")};`]:[...c,m,...$,...g,f,...v,_,...x];return`
            ${d.registerUniforms(u.map(S=>({name:`${ji(S)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,s)}

            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${a.map((S,T)=>`var input${T}Indices: ${a[T].type.indices};`).join(`
`)}
            ${k.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:r.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let d=u.filter(f=>r.symbolToInfo.has(f)).map(f=>({type:12,data:r.symbolToInfo.get(f)?.dimValue||0}));d.push({type:12,data:n});let c=e.map((f,m)=>[...K(f)]).reduce((f,m)=>f.concat(m),d);return c.push(...K(i)),{outputs:[{dims:i,dataType:t}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:c}},getShaderSource:l}},vc=(e,t)=>{let r=new yu(e.inputs,t.equation),i=r.outputDims,a=e.inputs.map((n,s)=>n.dims);e.compute(bu(a,e.inputs[0].dataType,r,i))},xc=e=>{let t=e.equation.replace(/\s+/g,"");return pe({equation:t})}}),$u,Gi,wu,vu,Sc,og=P(()=>{"use strict";J(),ie(),ne(),$u=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=r.length<t.length?0:r.length-t.length,a=t.length<r.length?0:t.length-r.length;for(;i<r.length&&a<t.length;++i,++a)if(r[i]!==t[a]&&r[i]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Gi=(e,t)=>{let r=e.length-t.length,i=[];for(let a=0;a<r;++a)i.push(e[a]);for(let a=0;a<t.length;++a)i.push(t[a]===1?e[a+r]:t[a]);return i},wu=(e,t)=>e.length>t.length?Gi(e,t):Gi(t,e),vu=e=>{let t=e[0].dims,r=Array.from(e[1].getBigInt64Array(),Number),i=wu(t,r),a=e[0].dataType,n=a===9||C.size(t)===1,s=a===9||t.length>0&&t[t.length-1]%4===0?4:1,u=n||i.length>0&&i[i.length-1]%4===0?4:1,l=Math.ceil(C.size(i)/u),d=f=>{let m=R("input",a,t.length,s),_=j("output",a,i.length,u),g;if(a===9){let $=(x,v,b="")=>`
          let outputIndices${v} = ${_.offsetToIndices(`outputOffset + ${v}u`)};
          let offset${v} = ${m.broadcastedIndicesToOffset(`outputIndices${v}`,_)};
          let index${v} = offset${v} / 4u;
          let component${v} = offset${v} % 4u;
          ${x}[${v}] = ${b}(${m.getByOffset(`index${v}`)}[component${v}]);
        `;g=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${$("data",0,"u32")}
        ${$("data",1,"u32")}
        ${$("data",2,"u32")}
        ${$("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else g=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${m.getByOffset(`inputOffset / ${s}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${f.registerUniform("vec_size","u32").declareVariables(m,_)}
    ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${g}`},c=[{type:12,data:l},...K(t,i)];return{name:"Expand",shaderCache:{hint:`${i.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:d,getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c})}},Sc=e=>{$u(e.inputs),e.compute(vu(e.inputs),{inputs:[0]})}}),xu,kc,ug=P(()=>{"use strict";J(),ie(),ne(),Ga(),xu=e=>{let t=e[0].dataType,r=C.size(e[0].dims),i=C.size(e[1].dims),a=i%4===0,n=s=>{let u=R("x",t,[1],4),l=R("bias",t,[1],4),d=j("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],f=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${l.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,m=a?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${f(0)}${f(1)}${f(2)}${f(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(u,l,d)}

    ${$a(Ie(t))}

    ${s.mainStart(Mt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${d.setByOffset("global_idx",wa("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:n,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(r/4)},{type:12,data:i}],dispatchGroup:{x:Math.ceil(r/Mt/4)}})}},kc=e=>{e.inputs.length<2||C.size(e.inputs[1].dims)===0?Gp(e):e.compute(xu(e.inputs))}}),Su,ku,Tc,Ic,lg=P(()=>{"use strict";J(),ie(),$e(),ne(),Su=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},ku=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,n=C.normalizeAxis(t.axis,a),s=r.slice(0);s.splice(n,1,...i);let u=r[n],l=e[0].dataType===9?4:1,d=Math.ceil(C.size(s)/l),c=[{type:12,data:d},{type:6,data:u},{type:12,data:n},...K(e[0].dims,e[1].dims,s)],f=m=>{let _=R("data",e[0].dataType,e[0].dims.length,l),g=R("inputIndices",e[1].dataType,e[1].dims.length),$=j("output",e[0].dataType,s.length,l),x=b=>{let k=i.length,S=`var indicesIndices${b}  = ${g.type.indices}(0);`;for(let T=0;T<k;T++)S+=`${k>1?`indicesIndices${b}[${T}]`:`indicesIndices${b}`} = ${s.length>1?`outputIndices${b}[uniforms.axis + ${T}]`:`outputIndices${b}`};`;S+=`
          var idx${b} = ${g.getByIndices(`indicesIndices${b}`)};
          if (idx${b} < 0) {
            idx${b} = idx${b} + uniforms.axisDimLimit;
          }
          var dataIndices${b} : ${_.type.indices};
        `;for(let T=0,E=0;T<a;T++)T===n?(S+=`${a>1?`dataIndices${b}[${T}]`:`dataIndices${b}`} = u32(idx${b});`,E+=k):(S+=`${a>1?`dataIndices${b}[${T}]`:`dataIndices${b}`} = ${s.length>1?`outputIndices${b}[${E}]`:`outputIndices${b}`};`,E++);return S},v;if(e[0].dataType===9){let b=(k,S,T="")=>`
          let outputIndices${S} = ${$.offsetToIndices(`outputOffset + ${S}u`)};
          ${x(S)};
          let offset${S} = ${_.indicesToOffset(`dataIndices${S}`)};
          let index${S} = offset${S} / 4u;
          let component${S} = offset${S} % 4u;
          ${k}[${S}] = ${T}(${_.getByOffset(`index${S}`)}[component${S}]);
        `;v=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${b("value",0,"u32")}
        ${b("value",1,"u32")}
        ${b("value",2,"u32")}
        ${b("value",3,"u32")}
        ${$.setByOffset("global_idx","value")}
      `}else v=`
      let outputIndices = ${$.offsetToIndices("global_idx")};
      ${x("")};
      let value = ${_.getByIndices("dataIndices")};
      ${$.setByOffset("global_idx","value")};
      `;return`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,g,$)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${v}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:f}},Tc=e=>pe({axis:e.axis}),Ic=(e,t)=>{let r=e.inputs;Su(r),e.compute(ku(e.inputs,t))}}),Tu,Ec,zc,dg=P(()=>{"use strict";J(),ie(),ne(),Tu=(e,t,r,i,a,n,s,u,l)=>{let d=[{type:12,data:n},{type:12,data:i},{type:12,data:a},{type:12,data:r},{type:12,data:s},{type:12,data:u},{type:12,data:l}],c=[n];d.push(...K(t.dims,c));let f=m=>{let _=R("indices_data",t.dataType,t.dims.length),g=j("input_slice_offsets_data",12,1,1),$=[_,g],x=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:r.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${m.registerUniforms(x).declareVariables(...$)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${r.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${r.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:d}),getShaderSource:f},{inputs:[t],outputs:[-1]})[0]},Ec=(e,t)=>{let r=e.inputs,i=r[0].dims,a=r[0].dataType,n=r[1].dims,s=n[n.length-1],u=C.sizeToDimension(n,n.length-1),l=C.sizeFromDimension(i,t.batchDims+s),d=C.sizeToDimension(i,t.batchDims),c=C.sizeFromDimension(i,t.batchDims),f=u/d,m=new Array(s),_=l;for(let S=0;S<s;++S)m[s-1-S]=_,_*=i[t.batchDims+s-1-S];let g=Tu(e,r[1],m,t.batchDims,i,u,f,c,s),$=t.batchDims+s;if($>i.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let x=n.slice(0,-1).concat(i.slice($)),v=C.size(x),b=[{type:12,data:v},{type:12,data:l},...K(r[0].dims,g.dims,x)],k=S=>{let T=R("data",r[0].dataType,r[0].dims.length),E=R("slice_offsets",12,g.dims.length),z=j("output",r[0].dataType,x.length);return`
          ${S.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(T,E,z)}
            ${S.mainStart()}
            ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:x,dataType:a}],dispatchGroup:{x:Math.ceil(v/64)},programUniforms:b}),getShaderSource:k},{inputs:[r[0],g]})},zc=e=>({batchDims:e.batch_dims,cacheKey:""})}),Iu,Eu,Cc,Ac,pg=P(()=>{"use strict";J(),ie(),$e(),ne(),Iu=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let r=C.normalizeAxis(t.quantizeAxis,e[0].dims.length),i=t.blockSize,a=e[0],n=e[2],s=e.length===4?e[3]:void 0;if(n.dims.length!==a.dims.length||!a.dims.map((u,l)=>l===r?Math.ceil(u/i)===n.dims[l]:u===n.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==n.dims.length||!s.dims.map((u,l)=>u===n.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},Eu=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r.length,n=C.normalizeAxis(t.gatherAxis,a),s=C.normalizeAxis(t.quantizeAxis,a),u=r.slice(0);u.splice(n,1,...i);let l=C.size(u),d=e[2].dataType,c=e[0].dataType===22,f=[{type:12,data:l},{type:12,data:s},{type:12,data:n},{type:12,data:t.blockSize},...K(...e.map((_,g)=>_.dims),u)],m=_=>{let g=R("data",e[0].dataType,e[0].dims.length),$=R("inputIndices",e[1].dataType,e[1].dims.length),x=R("scales",e[2].dataType,e[2].dims.length),v=e.length>3?R("zeroPoint",e[3].dataType,e[3].dims.length):void 0,b=j("output",d,u.length),k=[g,$,x];v&&k.push(v);let S=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${_.registerUniforms(S).declareVariables(...k,b)}
        ${_.mainStart()}
        let output_indices = ${b.offsetToIndices("global_idx")};
        var indices_indices = ${$.type.indices}(0);
        ${i.length>1?`
          for (var i: u32 = 0; i < ${i.length}; i++) {
            let index = ${b.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${$.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${b.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${g.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${b.indicesGet("output_indices","i")};
          ${g.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${$.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${r[n]};
        }
        ${g.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${b.indicesGet("output_indices",`i + ${i.length} - 1`)};
          ${g.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${g.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${g.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${x.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${x.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${x.getByIndices("scale_indices")};
        ${v?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${v.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${v.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ie(d)}(quantized_data - zero_point) * scale;
        ${b.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((_,g)=>g!==1).map(_=>_.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(_,g)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:d}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:f}),getShaderSource:m}},Cc=(e,t)=>{let r=e.inputs;Iu(r,t),e.compute(Eu(e.inputs,t))},Ac=e=>pe({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),zu,Cu,Oc,Rc,cg=P(()=>{"use strict";J(),ie(),$e(),ne(),zu=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Cu=(e,t)=>{let r=e[0].dims,i=e[0].dataType,a=r.length,n=e[1].dims,s=e[1].dataType,u=C.normalizeAxis(t.axis,a),l=r[u],d=n.slice(0),c=C.size(d),f=R("input",i,a),m=R("indicesInput",s,n.length),_=j("output",i,d.length),g=[{type:12,data:c},{type:6,data:l},{type:12,data:u}];return g.push(...K(r,n,d)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:d,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:g}),getShaderSource:$=>`
      ${$.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(f,m,_)}
      ${$.mainStart()}
      ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${f.type.indices}(outputIndices);
      ${f.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${f.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},Oc=e=>pe({axis:e.axis}),Rc=(e,t)=>{let r=e.inputs;zu(r),e.compute(Cu(e.inputs,t))}}),Au,Ou,Bc,Mc,fg=P(()=>{"use strict";J(),ie(),ne(),Au=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Ou=(e,t)=>{let r=e[0].dims.slice(),i=e[1].dims.slice(),[a,n,s]=Od.getShapeOfGemmResult(r,t.transA,i,t.transB,e.length===3?e[2].dims:void 0),u=[a,n];if(!u)throw new Error("Can't use gemm on the given tensors");let l=16,d=Math.ceil(n/l),c=Math.ceil(a/l),f=!0,m=C.size(u),_=[{type:12,data:f?d:m},{type:12,data:a},{type:12,data:n},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],g=["type","type"];e.length===3&&(_.push(...K(e[2].dims)),g.push("rank")),_.push(...K(u));let $=v=>{let b="";t.transA&&t.transB?b="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?b="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?b="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&(b="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let k=t.alpha===1?"":"value *= uniforms.alpha;",S=R("a",e[0].dataType,e[0].dims),T=R("b",e[1].dataType,e[1].dims),E=S.type.value,z=null,B=[S,T];e.length===3&&(z=R("c",e[2].dataType,e[2].dims.length),B.push(z));let N=j("output",e[0].dataType,u.length);B.push(N);let V=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${v.registerUniforms(V).declareVariables(...B)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${E}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${b}
    }

    ${k}
    ${z!=null?`let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)",N)}; value += ${E}(uniforms.beta) * ${z.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},x=v=>{let b=R("a",e[0].dataType,e[0].dims),k=R("b",e[1].dataType,e[1].dims),S=null,T=[b,k];e.length===3&&(S=R("c",e[2].dataType,e[2].dims.length),T.push(S));let E=j("output",e[0].dataType,u.length);T.push(E);let z=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],B="",N="";t.transA&&t.transB?(N=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,B="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(N=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,B="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(N=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,B="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(N=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${b.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${k.type.value}(0);
      }
      `,B="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let V=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${v.registerUniforms(z).declareVariables(...T)}
  var<workgroup> tile_a: array<array<${b.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${k.type.storage}, ${l}>, ${l}>;
  ${v.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${E.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${N}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${B}
      }
      workgroupBarrier();
    }

    ${V}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${S!=null?`let cOffset = ${S.broadcastedIndicesToOffset("vec2(m, n)",E)}; value += ${E.type.value}(uniforms.beta) * ${S.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return f?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:d*c},programUniforms:_}),getShaderSource:x}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:_}),getShaderSource:$}},Bc=e=>{let t=e.transA,r=e.transB,i=e.alpha,a=e.beta;return{transA:t,transB:r,alpha:i,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Mc=(e,t)=>{Au(e.inputs),e.compute(Ou(e.inputs,t))}}),Qe,et,gt,_t,Ru,Bu,Mu,Nu,Du,Pu,Uu,qu,Nc,Dc,hg=P(()=>{"use strict";J(),ie(),$e(),ne(),[Qe,et,gt,_t]=[0,1,2,3],Ru=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Bu=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Mu=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Nu=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Du=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Pu=(e,t,r)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Qe}] = batch;
     indices[${et}] = channel;`+(()=>{switch(r.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${gt}] = u32(r);
            indices[${_t}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${gt}] = u32(clamp(r, 0, H - 1));
          indices[${_t}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${gt}] = gs_reflect(r, border[1], border[3]);
          indices[${_t}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${r.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Uu=(e,t,r)=>(()=>{switch(r.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Qe}], indices[${et}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Qe}], indices[${et}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Qe}], indices[${et}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Qe}], indices[${et}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Qe}], indices[${et}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Qe}], indices[${et}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${r.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,qu=(e,t)=>{let r=R("x",e[0].dataType,e[0].dims.length),i=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=R("grid",e[1].dataType,i.length,2),n=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(n=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Qe,et,gt,_t]=[0,3,1,2]);let s=j("output",e[0].dataType,n.length),u=r.type.value,l=C.size(n),d=[{type:12,data:l},...K(e[0].dims,i,n)],c=f=>`
  ${f.registerUniform("output_size","u32").declareVariables(r,a,s)}
  ${Bu}
  ${Mu(u)}
  ${Nu(t)}
  ${Du(t)}
  ${Pu(r,u,t)}

  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${gt}]);
      let W_in = i32(uniforms.x_shape[${_t}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Qe}], indices[${gt}], indices[${_t}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Uu(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:f=>{let m=C.size(n);return{outputs:[{dims:n,dataType:f[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:d}},getShaderSource:c}},Nc=(e,t)=>{Ru(e.inputs),e.compute(qu(e.inputs,t))},Dc=e=>pe({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ee,Wu,Pc,Hi,Lu,rr,Uc,qc=P(()=>{"use strict";J(),ie(),$e(),Wa(),ja(),ne(),ft(),Ee=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,Wu=(e,t)=>{let r=e[0],i=Ee(e,1),a=Ee(e,2),n=Ee(e,3),s=Ee(e,4),u=Ee(e,5),l=Ee(e,6),d=Ee(e,7);if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=r.dims[0],f=r.dims[1],m=r.dims.length===3?r.dims[2]:t.numHeads*r.dims[4],_=f,g=0,$=0,x=Math.floor(m/t.numHeads);if(l&&d&&C.size(l.dims)&&C.size(d.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[3]!==x)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(d.dims[0]!==c||d.dims[1]!==t.numHeads||d.dims[3]!==x)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==d.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(d.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');g=l.dims[2],$=l.dims[2]}else if(l&&C.size(l.dims)||d&&C.size(d.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v;if(i&&C.size(i.dims)>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(i.dims[2]!==r.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');v=2,_=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==x)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');v=5,_=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==x)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');v=0,_=i.dims[2]}}else{if(r.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(r.dims[2]!==t.numHeads||r.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}if(n&&C.size(n.dims)>0){if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(i&&i.dims.length===5&&i.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let b=g+_,k=0;if(s&&C.size(s.dims)>0){k=8;let z=s.dims;throw z.length===1?z[0]===c?k=1:z[0]===3*c+2&&(k=3):z.length===2&&z[0]===c&&z[1]===b&&(k=5),k===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let S=!1,T=m;if(a&&C.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(_!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');T=a.dims[2]}else{if(_!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');T=a.dims[1]*a.dims[3],S=!0}}let E=!1;if(s&&C.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&C.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==t.numHeads||u.dims[2]!==f||u.dims[3]!==b)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:f,pastSequenceLength:g,kvSequenceLength:_,totalSequenceLength:b,maxSequenceLength:$,inputHiddenSize:0,hiddenSize:m,vHiddenSize:T,headSize:x,vHeadSize:Math.floor(T/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:k,scale:t.scale,broadcastResPosBias:E,passPastInKv:S,qkvFormat:v}},Pc=e=>pe({...e}),Hi=pe({perm:[0,2,1,3]}),Lu=(e,t,r,i,a,n,s)=>{let u=[i,a,n],l=C.size(u),d=[{type:12,data:l},{type:12,data:s},{type:12,data:n}],c=f=>{let m=j("qkv_with_bias",t.dataType,u),_=R("qkv",t.dataType,u),g=R("bias",r.dataType,u),$=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${f.registerUniforms($).declareVariables(_,g,m)}
  ${f.mainStart()}
    ${f.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:d}),getShaderSource:c},{inputs:[t,r],outputs:[-1]})[0]},rr=(e,t,r,i,a,n,s,u)=>{let l=n;if(s&&C.size(s.dims)>0){if(i===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Lu(e,n,s,t,i,r*a,u),l=l.reshape([t,i,r,a]),r===1||i===1?l:e.compute(Re(l,Hi.perm),{inputs:[l],outputs:[-1]})[0]}else return n.dims.length===3&&(l=n.reshape([t,i,r,a])),r===1||i===1?l:e.compute(Re(l,Hi.perm),{inputs:[l],outputs:[-1]})[0]},Uc=(e,t)=>{let r=Wu(e.inputs,t),i=e.inputs[0],a=Ee(e.inputs,1),n=Ee(e.inputs,2),s=Ee(e.inputs,3),u=Ee(e.inputs,4),l=Ee(e.inputs,5),d=Ee(e.inputs,6),c=Ee(e.inputs,7);if(i.dims.length===5)throw new Error("Packed QKV is not implemented");if(a?.dims.length===5)throw new Error("Packed KV is not implemented");let f=a&&n&&a.dims.length===4&&n.dims.length===4,m=rr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,i,s,0);if(f)return nr(e,m,a,n,u,void 0,d,c,l,r);if(!a||!n)throw new Error("key and value must be provided");let _=rr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.headSize,a,s,r.hiddenSize),g=rr(e,r.batchSize,r.numHeads,r.kvSequenceLength,r.vHeadSize,n,s,2*r.hiddenSize);nr(e,m,_,g,u,void 0,d,c,l,r)}}),Vu,ju,Gu,Hu,Ta,Wc,Lc,Vc=P(()=>{"use strict";J(),ie(),$e(),ne(),Vu=e=>{if(!e||e.length<1)throw new Error("too few inputs")},ju=(e,t)=>{let r=[],i=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>r.push(Number(a))),i=r.length),pe({numOutputs:i,axis:t.axis,splitSizes:r})},Gu=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${G("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Hu=e=>{let t=e.length,r=[];for(let i=0;i<t;++i){let a=e[i].setByIndices("indices","input[global_idx]");t===1?r.push(a):i===0?r.push(`if (output_number == ${i}u) { ${a} }`):i===t-1?r.push(`else { ${a} }`):r.push(`else if (output_number == ${i}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${r.join(`
`)}
      }`},Ta=(e,t)=>{let r=e[0].dims,i=C.size(r),a=e[0].dataType,n=C.normalizeAxis(t.axis,r.length),s=new Array(t.numOutputs),u=R("input",a,r.length),l=new Array(t.numOutputs),d=[],c=[],f=0,m=[{type:12,data:i}];for(let g=0;g<t.numOutputs;g++){f+=t.splitSizes[g],l[g]=f;let $=r.slice();$[n]=t.splitSizes[g],c.push($),s[g]=j(`output${g}`,a,$.length),d.push({dims:c[g],dataType:e[0].dataType})}m.push({type:12,data:l},...K(r,...c));let _=g=>`
  ${g.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...s)}
  ${Gu(l.length)}
  ${Hu(s)}

  ${g.mainStart()}
    ${g.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${G("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",n,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:d,dispatchGroup:{x:Math.ceil(i/64)},programUniforms:m})}},Wc=(e,t)=>{Vu(e.inputs);let r=e.inputs.length===1?t:ju(e.inputs,t);e.compute(Ta(e.inputs,r),{inputs:[0]})},Lc=e=>{let t=e.axis,r=e.splitSizes,i=e.numOutputs<0?r.length:e.numOutputs;if(i!==r.length)throw new Error("numOutputs and splitSizes lengh must be equal");return pe({axis:t,numOutputs:i,splitSizes:r})}}),Fu,Lr,jc,Gc=P(()=>{"use strict";J(),ie(),$e(),ne(),Fu=(e,t)=>{let[r,i,a,n]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(r.dims.length!==3&&r.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${r.dims.length}`);if(!C.areEqual(i.dims,[])&&!C.areEqual(i.dims,[1])&&i.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${i.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(!C.areEqual(a.dims,n.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=r.dims[0],d=r.dims[r.dims.length-2],c=a.dims[0],f=C.sizeFromDimension(r.dims,1)/d,m=u===0?a.dims[1]*2:f/s;if(u>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(i.dims.length===2){if(l!==i.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${i.dims[0]}`);if(d!==i.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${i.dims[1]}`)}if(m/2!==a.dims[1]&&u/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);if(d>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Lr=(e,t)=>{let{interleaved:r,numHeads:i,rotaryEmbeddingDim:a,scale:n}=t,s=e[0].dims[0],u=C.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],d=u/l,c=e[2].dims[1],f=a===0?c*2:d/i,m=new Array(s,l,d/f,f-c),_=C.computeStrides(m),g=[{type:1,data:n},{type:12,data:m},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[u,d,f,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,f,l*f,1]}):[],...K(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],$=x=>{let v=R("input",e[0].dataType,e[0].dims.length),b=R("position_ids",e[1].dataType,e[1].dims.length),k=R("cos_cache",e[2].dataType,e[2].dims.length),S=R("sin_cache",e[3].dataType,e[3].dims.length),T=j("output",e[0].dataType,e[0].dims.length);return x.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${x.declareVariables(v,b,k,S,T)}

        ${x.mainStart(Mt)}
          let half_rotary_emb_dim = uniforms.${k.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${x.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${b.broadcastedIndicesToOffset("bsnh.xy",j("",b.type.tensor,2))};
            let position_id =
                u32(${b.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${r});
            let j = i + select(half_rotary_emb_dim, 1, ${r});
            let re = ${v.getByOffset("i")} * ${k.get("position_id","bsnh[3]")} -
                ${v.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${T.setByOffset("i","re")}
            let im = ${v.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} +
                ${v.getByOffset("j")} * ${k.get("position_id","bsnh[3]")};
            ${T.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${T.setByOffset("k",v.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:pe({interleaved:r}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:$,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(C.size(m)/Mt)},programUniforms:g})}},jc=(e,t)=>{Fu(e.inputs,t),e.compute(Lr(e.inputs,t))}}),Ku,Zu,Fi,Qu,Hc,mg=P(()=>{"use strict";$e(),J(),ja(),qc(),Vc(),ft(),Gc(),ne(),Ku=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let r=e[0],i=e[1],a=e[2],n=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(r.dims.length!==3&&r.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=r.dims[0],d=r.dims[1],c=r.dims.length===3?u?r.dims[2]/3:r.dims[2]:t.numHeads*r.dims[4],f=d,m=0,_=!i||i.dims.length===0,g=Math.floor(_?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);_&&(c=g*t.numHeads);let $=n&&n.dims.length!==0,x=s&&s.dims.length!==0;if($&&n.dims.length===4&&n.dims[0]===l&&n.dims[1]!==t.kvNumHeads&&n.dims[2]===t.kvNumHeads&&n.dims[3]===g)throw new Error("BSNH pastKey/pastValue is not supported");if($&&x){if(n.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=n.dims[2]}else if($||x)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let v=1;if(i&&i.dims.length>0){if(r.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(i.dims.length<3||i.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(r.dims[0]!==i.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(i.dims.length===3){if(r.dims[2]%i.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');f=i.dims[1]}else if(i.dims.length===5){if(i.dims[2]!==t.numHeads||i.dims[3]!==2||i.dims[4]!==g)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');f=i.dims[1]}else{if(i.dims[1]!==t.numHeads||i.dims[3]!==g)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');f=i.dims[2]}}else{if(r.dims.length!==3&&r.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(r.dims.length===5&&(r.dims[2]!==t.numHeads||r.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');v=3}let b=0,k=!1,S=t.kvNumHeads?g*t.kvNumHeads:c;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(r.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(f!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');S=a.dims[2]}else{if(f!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');S=a.dims[1]*a.dims[3],k=!0}}let T=e.length>4?e[5]:void 0;if(T&&T.dims.length!==1&&T.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:d,pastSequenceLength:m,kvSequenceLength:f,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:S,headSize:g,vHeadSize:Math.floor(S/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:b,scale:t.scale,broadcastResPosBias:!1,passPastInKv:k,qkvFormat:v}},Zu=pe({perm:[0,2,1,3]}),Fi=(e,t,r)=>{let i=t,a=r.kvNumHeads;return t.dims.length===3&&r.kvSequenceLength!==0&&(i=t.reshape([r.batchSize,r.kvSequenceLength,a,r.headSize]),i=e.compute(Re(i,Zu.perm),{inputs:[i],outputs:[-1]})[0]),i},Qu=(e,t,r,i)=>{let a=7,n=["type","type"],s=[e*t],u=e*t,l=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],d=c=>{let f=R("seq_lens",r.dataType,r.dims),m=R("total_seq_lens",i.dataType,i.dims),_=j("pos_ids",a,s),g=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(g).declareVariables(f,m,_)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${m.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${f.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${_.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:n},getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:d}},Hc=(e,t)=>{let r=Ku(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let i=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,n=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,d=e.inputs.length>5?e.inputs[6]:void 0,c=r.kvNumHeads?r.kvNumHeads:r.numHeads,f=pe({axis:2,numOutputs:3,splitSizes:[r.numHeads*r.headSize,c*r.headSize,c*r.headSize]}),[m,_,g]=!a&&!n?e.compute(Ta([i],f),{inputs:[i],outputs:[-1,-1,-1]}):[i,a,n],$,x;if(t.doRotary){let S=e.compute(Qu(r.batchSize,r.sequenceLength,l,d),{inputs:[l,d],outputs:[-1]})[0],T=e.inputs[7],E=e.inputs[8],z=pe({interleaved:t.rotaryInterleaved!==0,numHeads:r.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),B=[m,S,T,E],N=[-1];$=e.compute(Lr(B,z),{inputs:B,outputs:N})[0],B.splice(0,1,_);let V=pe({interleaved:t.rotaryInterleaved!==0,numHeads:r.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});x=e.compute(Lr(B,V),{inputs:B,outputs:N})[0]}let v=rr(e,r.batchSize,r.numHeads,r.sequenceLength,r.headSize,t.doRotary?$:m,void 0,0),b=Fi(e,t.doRotary?x:_,r),k=Fi(e,g,r);nr(e,v,b,k,void 0,void 0,s,u,void 0,r,l,d)}}),Ki,Xu,Yu,Fc,gg=P(()=>{"use strict";J(),ie(),ft(),ne(),Ki=(e,t,r,i,a,n,s,u)=>{let l=ye(n),d=l===1?"f32":`vec${l}f`,c=l===1?"vec2f":`mat2x${l}f`,f=a*s,m=64;f===1&&(m=256);let _=[a,s,n/l],g=[a,s,2],$=["rank","type","type"],x=[];x.push(...K(_,g));let v=b=>{let k=R("x",t.dataType,3,l),S=R("scale",r.dataType,r.dims),T=R("bias",i.dataType,i.dims),E=j("output",1,3,2),z=[k,S,T,E];return`
  var<workgroup> workgroup_shared : array<${c}, ${m}>;
  const workgroup_size = ${m}u;
  ${b.declareVariables(...z)}
  ${b.mainStart(m)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${d}(0);
    var squared_sum = ${d}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${d}(${k.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${ct("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${ct("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${m}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:g,dataType:1}],dispatchGroup:{x:f},programUniforms:x}),getShaderSource:v},{inputs:[t,r,i],outputs:[-1]})[0]},Xu=(e,t,r)=>{let i=t[0].dims,a=i,n=2,s=i[0],u=i[1],l=C.sizeFromDimension(i,n),d=ye(l),c=C.size(a)/d,f=Ki(e,t[0],t[1],t[2],s,l,u,r.epsilon),m=[s,u,l/d],_=[s,u],g=["type","none"],$=x=>{let v=R("x",t[0].dataType,m.length,d),b=R("scale_shift",1,_.length,2),k=j("output",t[0].dataType,m.length,d),S=[v,b,k];return`
  ${x.registerUniform("output_size","u32").declareVariables(...S)}
  ${x.mainStart()}
  ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${k.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${b.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${v.getByOffset("global_idx")} * ${k.type.value}(scale_shift.x) + ${k.type.value}(scale_shift.y);
      ${k.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${d}`,inputDependencies:g},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...K(m,_,m)]}),getShaderSource:$},{inputs:[t[0],f]})},Yu=(e,t,r)=>{let i=t[0].dims,a=i,n=i[0],s=i[i.length-1],u=C.sizeFromDimension(i,1)/s,l=ye(s),d=C.size(a)/l,c=[{type:12,data:u},{type:12,data:Math.floor(s/l)}],f=["type","type"],m=!1,_=[0,i.length-1];for(let v=0;v<i.length-2;v++)m=m||i[v+1]!==1,_.push(v+1);m=m&&i[i.length-1]!==1;let g=m?e.compute(Re(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:i.length},(v,b)=>i[_[b]])),$=Ki(e,g,t[1],t[2],n,u,s,r.epsilon),x=v=>{let b=Se(t[0].dataType),k=l===1?"vec2f":`mat${l}x2f`,S=z=>{let B=z===0?"x":"y",N=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${b}(${N}(scale.${B}))`;case 2:return`vec2<${b}>(${N}(scale[0].${B}, scale[1].${B}))`;case 4:return`vec4<${b}>(${N}(scale[0].${B}, scale[1].${B}, scale[2].${B}, scale[3].${B}))`;default:throw new Error(`Not supported compoents ${l}`)}},T=R("input",t[0].dataType,t[0].dims,l),E=j("output",t[0].dataType,a,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${T.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${k}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${E.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${v.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${S(0)}, ${S(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:f},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(d/64)},programUniforms:c}),getShaderSource:x},{inputs:[t[0],$]})},Fc=(e,t)=>{t.format==="NHWC"?Yu(e,e.inputs,t):Xu(e,e.inputs,t)}}),Ju,el,Kc,_g=P(()=>{"use strict";J(),ie(),ne(),Ju=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},el=(e,t,r)=>{let i=t.simplified,a=e[0].dims,n=e[1],s=!i&&e[2],u=a,l=C.normalizeAxis(t.axis,a.length),d=C.sizeToDimension(a,l),c=C.sizeFromDimension(a,l),f=C.size(n.dims),m=s?C.size(s.dims):0;if(f!==c||s&&m!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${f} and bias size of ${m}`);let _=[];for(let T=0;T<a.length;++T)T<l?_.push(a[T]):_.push(1);let g=ye(c),$=["type","type"],x=[{type:12,data:d},{type:1,data:c},{type:12,data:Math.floor(c/g)},{type:1,data:t.epsilon}];s&&$.push("type");let v=r>1,b=r>2,k=T=>{let E=Se(e[0].dataType),z=[R("x",e[0].dataType,e[0].dims,g),R("scale",n.dataType,n.dims,g)];s&&z.push(R("bias",s.dataType,s.dims,g)),z.push(j("output",e[0].dataType,u,g)),v&&z.push(j("mean_data_output",1,_)),b&&z.push(j("inv_std_output",1,_));let B=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${T.registerUniforms(B).declareVariables(...z)}
  ${T.mainStart()}
    ${T.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${_a("f32",g)};
    var mean_square_vector = ${_a("f32",g)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Rt(E,g,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${ct("mean_vector",g)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${ct("mean_square_vector",g)} / uniforms.norm_size ${i?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Rt(E,g,"x[j + offset]")};
      let f32scale = ${Rt(E,g,"scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${i?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Rt(E,g,"bias[j]")}`:""}
      );
    }

    ${v?"mean_data_output[global_idx] = mean":""};
    ${b?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},S=[{dims:u,dataType:e[0].dataType}];return v&&S.push({dims:_,dataType:1}),b&&S.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${g};${r};${i}`,inputDependencies:$},getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(d/64)},programUniforms:x}),getShaderSource:k}},Kc=(e,t)=>{Ju(e.inputs),e.compute(el(e.inputs,t,e.outputCount))}}),tl,Zc,yg=P(()=>{"use strict";ie(),Za(),Qa(),tl=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Zc=e=>{tl(e.inputs);let t=Bt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let r=t[t.length-1],i=e.inputs[0].dims[e.inputs[0].dims.length-1];if(r<8&&i<8)e.compute(Ka(e.inputs,{activation:""},t));else{let a=t[t.length-2],n=C.size(e.inputs[0].dims.slice(0,-2)),s=C.size(e.inputs[1].dims.slice(0,-2));if(n!==1&&a===1&&s===1){let u=e.inputs[0].reshape([1,n,i]),l=e.inputs[1].reshape([1,i,r]),d=[1,n,r],c=[u,l];e.compute(Wr(c,{activation:""},t,d),{inputs:c})}else e.compute(Wr(e.inputs,{activation:""},t))}}}),rl,il,al,Qc,Xc,bg=P(()=>{"use strict";J(),ie(),$e(),ne(),rl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let r=e[0],i=r.dims.length;if(r.dims[i-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),n=t.blockSize/8*t.bits,s=e[1];if(!C.areEqual(s.dims,[t.n,a,n]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(C.size(u)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,d=t.bits>4?t.n*a:t.n*Math.floor((a+1)/2);if(C.size(l)!==d)throw new Error("zeroPoints input size error.")}},il=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],n=t.k,s=t.n,u=r.slice(0,i-2),l=C.size(u),d=e[1].dims[2]/4,c=e[0].dataType,f=ye(t.k),m=ye(d),_=ye(s),g=u.concat([a,s]),$=a>1&&s/_%2===0?2:1,x=C.size(g)/_/$,v=64,b=[],k=[l,a,n/f],S=C.convertShape(e[1].dims).slice();S.splice(-1,1,d/m),b.push(...K(k)),b.push(...K(S)),b.push(...K(e[2].dims)),e.length===4&&b.push(...K(C.convertShape(e[3].dims)));let T=[l,a,s/_];b.push(...K(T));let E=z=>{let B=k.length,N=R("a",e[0].dataType,B,f),V=R("b",12,S.length,m),Q=R("scales",e[2].dataType,e[2].dims.length),F=[N,V,Q],U=e.length===4?R("zero_points",12,e[3].dims.length):void 0;U&&F.push(U);let ee=T.length,oe=j("output",e[0].dataType,ee,_),L=Se(e[0].dataType),Y=(()=>{switch(f){case 1:return`array<${L}, 8>`;case 2:return`mat4x2<${L}>`;case 4:return`mat2x4<${L}>`;default:throw new Error(`${f}-component is not supported.`)}})(),re=()=>{let M=`
          // reuse a data
            var input_offset = ${N.indicesToOffset(`${N.type.indices}(batch, row, word_offset)`)};
            var a_data: ${Y};
            for (var j: u32 = 0; j < ${8/f}; j++) {
              a_data[j] = ${N.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let W=0;W<_*$;W++)M+=`
            b_value = ${m===1?`b${W}_data`:`b${W}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${Y}(${Array.from({length:4},(te,A)=>`${L}(b_value_lower[${A}]), ${L}(b_value_upper[${A}])`).join(", ")});
            b_dequantized_values = ${f===1?`${Y}(${Array.from({length:8},(te,A)=>`(b_quantized_values[${A}] - ${U?`zero_point${W}`:"zero_point"}) * scale${W}`).join(", ")});`:`(b_quantized_values - ${Y}(${Array(8).fill(`${U?`zero_point${W}`:"zero_point"}`).join(",")})) * scale${W};`};
            workgroup_shared[local_id.x * ${$} + ${Math.floor(W/_)}]${_>1?`[${W%_}]`:""} += ${Array.from({length:8/f},(te,A)=>`${f===1?`a_data[${A}] * b_dequantized_values[${A}]`:`dot(a_data[${A}], b_dequantized_values[${A}])`}`).join(" + ")};
          `;return M},X=()=>{let M=`
            var col_index = col * ${_};
            ${U?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${L}(8);`}
            `;for(let W=0;W<_*$;W++)M+=`
            let scale${W} = ${Q.getByOffset("col_index * nBlocksPerCol + block")};
            ${U?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${U.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${W} = ${L}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return M},fe=()=>{let M=`col_index = col * ${_};`;for(let W=0;W<_*$;W++)M+=`
            let b${W}_data = ${V.getByIndices(`${V.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return M+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${Y};
            var b_dequantized_values: ${Y};`,M};return`
        var<workgroup> workgroup_shared: array<${oe.type.value}, ${$*v}>;
        ${z.declareVariables(...F,oe)}
        ${z.mainStart([v,1,1])}
          let output_indices = ${oe.offsetToIndices(`(global_idx / ${v}) * ${$}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${v}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/f};
            ${X()}
            for (var word: u32 = 0; word < ${d}; word += ${m}) {
              ${fe()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${re()}
                word_offset += ${8/f};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${$}) {
            var output_value: ${oe.type.value} = ${oe.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${v}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${$};
            }
            ${oe.setByIndices(`${oe.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${f};${m};${_};${$};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:g,dataType:c}],dispatchGroup:{x},programUniforms:b}),getShaderSource:E}},al=(e,t)=>{let r=e[0].dims,i=r.length,a=r[i-2],n=t.k,s=t.n,u=r.slice(0,i-2),l=C.size(u),d=e[1].dims[2]/4,c=e[0].dataType,f=ye(t.k),m=ye(d),_=u.concat([a,s]),g=128,$=s%8===0?8:s%4===0?4:1,x=g/$,v=x*m*8,b=v/f,k=v/t.blockSize,S=C.size(_)/$,T=[],E=[l,a,n/f],z=C.convertShape(e[1].dims).slice();z.splice(-1,1,d/m),T.push(...K(E)),T.push(...K(z)),T.push(...K(e[2].dims)),e.length===4&&T.push(...K(C.convertShape(e[3].dims)));let B=[l,a,s];T.push(...K(B));let N=V=>{let Q=E.length,F=R("a",e[0].dataType,Q,f),U=R("b",12,z.length,m),ee=R("scales",e[2].dataType,e[2].dims.length),oe=[F,U,ee],L=e.length===4?R("zero_points",12,e[3].dims.length):void 0;L&&oe.push(L);let Y=B.length,re=j("output",e[0].dataType,Y),X=Se(e[0].dataType),fe=()=>{switch(f){case 1:return`
          let a_data0 = vec4<${X}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${X}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${X}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${X}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${f}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${F.type.value}, ${b}>;
        var<workgroup> inter_results: array<array<${re.type.value}, ${x}>, ${$}>;
        ${V.declareVariables(...oe,re)}
        ${V.mainStart([x,$,1])}
          let output_indices = ${re.offsetToIndices(`workgroup_index * ${$}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${k} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${b};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${b}; a_offset += ${g})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${F.getByIndices(`${F.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${F.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${k} + local_id.x;
            ${L?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${L.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${X}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${X}(8);`}
            let scale = ${ee.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${U.getByIndices(`${U.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/f};
            for (var i: u32 = 0; i < ${m}; i++) {
              ${fe()}
              let b_value = ${m===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${X}>(${Array.from({length:4},(M,W)=>`${X}(b_value_lower[${W}]), ${X}(b_value_upper[${W}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${X}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(M,W)=>`${`dot(a_data${W}, b_dequantized_values[${W}])`}`).join(" + ")};
              word_offset += ${8/f};
            }
            workgroupBarrier();
          }

          if (local_idx < ${$}) {
            var output_value: ${re.type.value} = ${re.type.value}(0);
            for (var b = 0u; b < ${x}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${re.setByIndices(`${re.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${f};${m};${x};${$}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:c}],dispatchGroup:{x:S},programUniforms:T}),getShaderSource:N}},Qc=(e,t)=>{rl(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(al(e.inputs,t)):e.compute(il(e.inputs,t))},Xc=e=>pe(e)}),nl,sl,ol,ul,ll,dl,pl,cl,Yc,$g=P(()=>{"use strict";J(),ie(),ne(),nl=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},sl=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
            k = i32(${e.indicesGet("indices",a)}) - ${G("uniforms.pads",a,r)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${G("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${G("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${i}
            value = x[offset];
          }
      `},ol=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${G("uniforms.pads",a,r)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${G("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${G("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${G("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},ul=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${G("uniforms.pads",a,r)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${G("uniforms.x_shape",a,t)})) {
                  k = i32(${G("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${G("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},ll=(e,t,r)=>{let i="";for(let a=t-1;a>=0;--a)i+=`
                k = i32(${e.indicesGet("indices",a)}) - ${G("uniforms.pads",a,r)};
                if (k < 0)  {
                  k += i32(${G("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${G("uniforms.x_shape",a,t)})) {
                  k -= i32(${G("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${G("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${i}
              value = x[offset];
          `},dl=(e,t,r)=>{switch(r.mode){case 0:return sl(e,t,r.pads.length);case 1:return ol(e,t,r.pads.length);case 2:return ul(e,t,r.pads.length);case 3:return ll(e,t,r.pads.length);default:throw new Error("Invalid mode")}},pl=(e,t)=>{let r=C.padShape(e[0].dims.slice(),t.pads),i=e[0].dims,a=C.size(r),n=[{type:12,data:a},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&n.push({type:s?e[2].dataType:1,data:t.value}),n.push(...K(e[0].dims,r));let u=["rank"],l=d=>{let c=j("output",e[0].dataType,r.length),f=R("x",e[0].dataType,i.length),m=f.type.value,_=dl(c,i.length,t),g=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&g.push({name:"constant_value",type:s?m:"f32"}),`
            ${d.registerUniforms(g).declareVariables(f,c)}
            ${d.mainStart()}
            ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(C.size(r)/64)},programUniforms:n}),getShaderSource:l}},cl=(e,t)=>{if(e.length>1){let r=e[1].getBigInt64Array(),i=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,n=new Int32Array(2*a).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let l=0;l<u.length;l++)n[Number(u[l])]=Number(r[l]),n[Number(u[l])+a]=Number(r[l+u.length])}else r.forEach((u,l)=>n[Number(l)]=Number(u));let s=[];return n.forEach(u=>s.push(u)),{mode:t.mode,value:i,pads:s}}else return t},Yc=(e,t)=>{nl(e.inputs);let r=cl(e.inputs,t);e.compute(pl(e.inputs,r),{inputs:[0]})}}),Zt,Zi,Qi,Xi,Yi,fl,hl,Ji,ea,Jc,ef,ta,tf,rf,ra,af,nf,sf,of,wg=P(()=>{"use strict";Ge(),J(),ie(),ne(),Zt=e=>{if(me.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},Zi=(e,t,r)=>{let i=t.format==="NHWC",a=e.dims.slice();i&&a.splice(1,0,a.pop());let n=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),l=n?t.dilations.slice():[],d=t.pads.slice();Ur.adjustPoolAttributes(r,a,s,u,l,d);let c=Ur.computePoolOutputShape(r,a,u,l,s,d,t.autoPad),f=Object.assign({},t);n?Object.assign(f,{kernelShape:s,strides:u,pads:d,dilations:l,cacheKey:t.cacheKey}):Object.assign(f,{kernelShape:s,strides:u,pads:d,cacheKey:t.cacheKey});let m=c.slice();return m.push(m.splice(1,1)[0]),[f,i?m:c]},Qi=(e,t)=>{let r=t.format==="NHWC",i=C.size(e),a=C.size(t.kernelShape),n=[{type:12,data:i},{type:12,data:a}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],d=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],f=!!(d+c);n.push({type:12,data:u},{type:12,data:l},{type:12,data:d},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],g=t.strides[t.strides.length-2],$=t.pads[t.pads.length/2-2],x=t.pads[t.pads.length-2];m=!!($+x),n.push({type:12,data:_},{type:12,data:g},{type:12,data:$},{type:12,data:x}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[n,s,!0,f,m]}else{if(r)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=C.computeStrides(t.kernelShape);n.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((d,c)=>d+c);return[n,s,!!l,!1,!1]}},Xi=(e,t,r,i,a,n,s,u,l,d,c,f)=>{let m=a.format==="NHWC",_=t.type.value,g=j("output",t.type.tensor,i);if(a.kernelShape.length<=2){let $="",x="",v="",b=r-(m?2:1);if(c?$=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${b}] < 0 || xIndices[${b}]
                      >= uniforms.x_shape[${b}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`:$=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${b}] = indices[${b}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`,a.kernelShape.length===2){let k=r-(m?3:2);f?x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${k}] = indices[${k}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${k}] < 0 || xIndices[${k}] >= uniforms.x_shape[${k}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:x=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${k}] = indices[${k}] * uniforms.sh - uniforms.phStart + j;
                `,v=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,g)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var value = ${_}(${u});
              var pad = 0;
              ${x}
              ${$}
              ${v}
              ${s}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let $=a.kernelShape.length,x=a.pads.length,v="";return d?v=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${n}
              }`:v=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${n}
            `,`
            ${e.registerUniforms(l).declareVariables(t,g)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${g.offsetToIndices("global_idx")};
              var xIndices = ${g.offsetToIndices("global_idx")};

              var offsets: array<u32, ${$}>;

              var value = ${_}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${$-1}u; j++) {
                  offsets[j] = offset / ${G("uniforms.kernelStrides","j",$)};
                  offset -= offsets[j] * ${G("uniforms.kernelStrides","j",$)};
                }
                offsets[${$-1}] = offset;

                isPad = false;
                for (var j = ${r-$}u; j < ${r}u; j++) {
                  xIndices[j] = indices[j] * ${G("uniforms.strides",`j - ${r-$}u`,$)}
                    + offsets[j - ${r-$}u] - ${G("uniforms.pads","j - 2u",x)};
                  ${v}
              }
              ${s}

              output[global_idx] = value;
            }`}},Yi=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,fl=e=>`${Yi(e)};${e.countIncludePad}`,hl=e=>`${Yi(e)};${e.storageOrder};${e.dilations}`,Ji=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ea=(e,t,r,i)=>{let[a,n]=Zi(t,i,r),s=R("x",t.dataType,t.dims.length),u=s.type.value,l="value += x_val;",d="";a.countIncludePad?d+=`value /= ${u}(uniforms.kernelSize);`:d+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[c,f,m,_,g]=Qi(n,a);c.push(...K(t.dims,n));let $=["rank"];return{name:e,shaderCache:{hint:`${i.cacheKey};${m};${_};${g}`,inputDependencies:$},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(C.size(n)/64)},programUniforms:c}),getShaderSource:x=>Xi(x,s,t.dims.length,n.length,a,l,d,0,f,m,_,g)}},Jc=e=>{let t=e.count_include_pad!==0,r=Ji(e);if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let i={countIncludePad:t,...r,cacheKey:""};return{...i,cacheKey:fl(i)}},ef=(e,t)=>{Zt(e.inputs),e.compute(ea("AveragePool",e.inputs[0],!1,t))},ta={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},tf=e=>{let t=e.format;return{format:t,...ta,cacheKey:t}},rf=(e,t)=>{Zt(e.inputs),e.compute(ea("GlobalAveragePool",e.inputs[0],!0,t))},ra=(e,t,r,i)=>{let[a,n]=Zi(t,i,r),s=`
      value = max(x_val, value);
    `,u="",l=R("x",t.dataType,t.dims.length),d=["rank"],[c,f,m,_,g]=Qi(n,a);return c.push(...K(t.dims,n)),{name:e,shaderCache:{hint:`${i.cacheKey};${m};${_};${g}`,inputDependencies:d},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(C.size(n)/64)},programUniforms:c}),getShaderSource:$=>Xi($,l,t.dims.length,n.length,a,s,u,t.dataType===10?-65504:-1e5,f,m,_,g)}},af=(e,t)=>{Zt(e.inputs),e.compute(ra("MaxPool",e.inputs[0],!1,t))},nf=e=>{let t=e.storage_order,r=e.dilations,i=Ji(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let a={storageOrder:t,dilations:r,...i,cacheKey:""};return{...a,cacheKey:hl(a)}},sf=e=>{let t=e.format;return{format:t,...ta,cacheKey:t}},of=(e,t)=>{Zt(e.inputs),e.compute(ra("GlobalMaxPool",e.inputs[0],!0,t))}}),ml,gl,uf,lf,vg=P(()=>{"use strict";J(),ie(),$e(),ne(),ml=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((r,i)=>r===e[2].dims[i]).reduce((r,i)=>r&&i,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,n)=>n===t.axis||a===e[0].dims[n]).reduce((a,n)=>a&&n,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let r=e[0].dims[t.axis],i=e[1].dims[t.axis];if(t.blockSize<Math.ceil(r/i)||t.blockSize>Math.ceil(r/(i-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},gl=(e,t)=>{let r=C.normalizeAxis(t.axis,e[0].dims.length),i=e[0].dataType,a=i===3,n=e[0].dims,s=e[1].dataType,u=C.size(n),l=i===3||i===2,d=l?[Math.ceil(C.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,f=e.length>2?e[2]:void 0,m=f?l?[Math.ceil(C.size(f.dims)/4)]:f.dims:void 0,_=c.length===0||c.length===1&&c[0]===1,g=_===!1&&c.length===1,$=ye(u),x=_&&(!l||$===4),v=x?$:1,b=x&&!l?$:1,k=R("input",l?12:i,d.length,b),S=R("scale",s,c.length),T=f?R("zero_point",l?12:i,m.length):void 0,E=j("output",s,n.length,v),z=[k,S];T&&z.push(T);let B=[d,c];f&&B.push(m);let N=[{type:12,data:u/v},{type:12,data:r},{type:12,data:t.blockSize},...K(...B,n)],V=Q=>{let F=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Q.registerUniforms(F).declareVariables(...z,E)}
      ${Q.mainStart()}
          ${Q.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${E.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${k.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${v===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${k.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${S.getByOffset("0")}`:g?`
            let scale_index = ${E.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${S.getByOffset("scale_index")};`:`
            var scale_indices: ${S.type.indices} = output_indices;
            let index = ${S.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${S.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${S.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${T?_?l?`
                let zero_point_input = ${T.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${T.getByOffset("0")}`:g?l?`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${T.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${E.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${T.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${S.indicesToOffset("scale_indices")};
                let zero_point_input = ${T.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${T.getByIndices("scale_indices")};`:`let zero_point_value = ${l?a?"i32":"u32":k.type.value}(0);`};
      // Compute and write output
      ${E.setByOffset("global_idx",`${E.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:T?["rank","rank","rank"]:["rank","rank"]},getShaderSource:V,getRunData:()=>({outputs:[{dims:n,dataType:s}],dispatchGroup:{x:Math.ceil(u/v/64),y:1,z:1},programUniforms:N})}},uf=(e,t)=>{ml(e.inputs,t),e.compute(gl(e.inputs,t))},lf=e=>pe({axis:e.axis,blockSize:e.blockSize})}),_l,yl,df,xg=P(()=>{"use strict";Ge(),J(),ne(),_l=(e,t,r)=>{let i=e===t,a=e<t&&r<0,n=e>t&&r>0;if(i||a||n)throw new Error("Range these inputs' contents are invalid.")},yl=(e,t,r,i)=>{let a=Math.abs(Math.ceil((t-e)/r)),n=[a],s=a,u=[{type:12,data:s},{type:i,data:e},{type:i,data:r},...K(n)],l=d=>{let c=j("output",i,n.length),f=c.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:f},{name:"delta",type:f}];return`
        ${d.registerUniforms(m).declareVariables(c)}
        ${d.mainStart()}
        ${d.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${f}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${i}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:n,dataType:i}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},df=e=>{let t=0,r=0,i=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],r=e.inputs[1].getInt32Array()[0],i=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],r=e.inputs[1].getFloat32Array()[0],i=e.inputs[2].getFloat32Array()[0]),me.webgpu.validateInputContent&&_l(t,r,i),e.compute(yl(t,r,i,e.inputs[0].dataType),{inputs:[]})}}),bl,ia,aa,$l,pf,cf,Sg=P(()=>{"use strict";J(),ie(),$e(),ne(),bl=(e,t,r,i)=>{if(e!=="none"&&i!=="i32"&&i!=="u32"&&i!=="f32")throw new Error(`Input ${i} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,n=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${r};`;case"add":return i==="i32"||i==="u32"?`atomicAdd(&${t}, bitcast<${i}>(${r}));`:`
              ${a}bitcast<${i}>(oldValue) + (${r})${n}`;case"max":return i==="i32"||i==="u32"?`atomicMax(&${t}, bitcast<${i}>(${r}));`:`
                ${a}max(bitcast<f32>(oldValue), (${r}))${n}`;case"min":return i==="i32"||i==="u32"?`atomicMin(&${t}, bitcast<${i}>(${r}));`:`${a}min(bitcast<${i}>(oldValue), (${r}))${n}`;case"mul":return`${a}(bitcast<${i}>(oldValue) * (${r}))${n}`;default:throw new Error(`Reduction ${e} is not supported.`)}},ia=(e,t)=>`${e===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[${t?"i - indices_start":"i"}];
    let dim_value = uniforms.output_shape[${t?"i - indices_start":"i"} + uniforms.last_index_dimension];`}
    
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));`,aa=(e,t,r)=>`for (var i = 0u; i < uniforms.num_updates_elements; i++) {
        let value = updates[uniforms.num_updates_elements * ${r?"global_idx":"idx"} + i];
        ${bl(e.reduction,"output[data_offset + i]","value",t)}
      }`,$l=(e,t)=>{let r=e[0].dims,i=e[1].dims,a=r,n=1,s=Math.ceil(C.size(i)/n),u=i[i.length-1],l=C.sizeFromDimension(r,u),d=C.sizeFromDimension(i,0)/u,c=[{type:12,data:s},{type:12,data:u},{type:12,data:l},...K(e[1].dims,e[2].dims,a)],f=m=>{let _=R("indices",e[1].dataType,e[1].dims.length),g=R("updates",e[2].dataType,e[2].dims.length,n),$=t.reduction!=="none"&&t.reduction!==""?Ud("output",e[0].dataType,a.length):j("output",e[0].dataType,a.length,n);return`
      ${m.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(_,g,$)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var hasDuplicates = false;
  if (${t.reduction==="none"}) {
    for (var i = 0; i < ${d}; i = i + 1) {
      for (var j = i + 1; j < ${d}; j = j + 1) {
        var index_i = i32(indices[i].x);
        var index_j = i32(indices[j].x);
        if (index_i == index_j) {
          hasDuplicates = true;
          break;
        }
      }
      if (hasDuplicates) {
        break;
      }
    }
  }

  if (${t.reduction==="none"} && hasDuplicates) {
    if (global_idx != 0u) {
      return;
    }
    // Process each index-update pair individually when duplicates exist
    for (var idx = 0u; idx < ${d}u; idx++) {
      var data_offset = 0u;
      for (var i = 0u; i < uniforms.last_index_dimension; i++) {
        var index = i32(indices[idx * uniforms.last_index_dimension + i].x);
        ${ia(r.length,!1)}
      }
      ${aa(t,$.type.value,!1)}
    }
    return;
  }

  var data_offset = 0u;
  var indices_start = uniforms.last_index_dimension * global_idx;
  var indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${ia(r.length,!0)}
  }
  ${aa(t,$.type.value,!0)}
  }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:c}),getShaderSource:f}},pf=e=>pe({reduction:e.reduction}),cf=(e,t)=>{e.compute($l(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),wl,vl,xl,na,Sl,kl,Tl,Il,El,zl,Cl,Al,sa,Ol,Rl,Bl,Ml,Nl,ff,hf,kg=P(()=>{"use strict";J(),ie(),$e(),ne(),wl=(e,t)=>{if(e.every(r=>r>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},vl=(e,t,r)=>{t.every(a=>a>=0&&a<r||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let i=new Array(r).fill(1);return t.forEach((a,n)=>i[a]=e[n]),i},xl=(e,t,r,i,a,n)=>{let[s,u,l]=r>10?[1,2,3]:[-1,e.length>1?1:-1,-1],d=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(c=>n.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(c=>i.push(c)),i.length!==0&&i.length!==d&&r>=18&&i.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");wl(i,t),t.axes.length>0&&vl(i,t.axes,d).forEach((c,f)=>i[f]=c)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(c=>a.push(Number(c))),a.length!==0&&a.length!==d&&r>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(i.length!==0&&i.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof i<"u"&&typeof a<"u"&&i.length>0&&a.length>d)throw new Error("Resize requires only of scales or sizes to be specified")},na=(e,t,r,i)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${i}(big / (${r}));
  let fract = ${i}(big % (${r})) / ${i}(${r});
  return whole + fract;
`,Sl=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${na("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${na("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",kl=(e,t,r)=>`fn getNearestPixelFromOriginal(xOriginal: ${r}, isDownSample: bool) -> ${r} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";case"simple":default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Tl=(e,t,r)=>{let i=new Array(r).fill(0).concat(new Array(r).fill(1)),a=e.length===0?i:e.slice();return t.length>0?(t.forEach((n,s)=>{i[n]=a[s],i[s+r]=a[t.length+s]}),i):a},Il=(e,t,r,i)=>{let a=[];if(r.length>0)if(i.length>0){if(e.forEach(n=>a.push(n)),Math.max(...i)>e.length)throw new Error("axes is out of bound");i.forEach((n,s)=>a[n]=r[s])}else r.forEach(n=>a.push(n));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((n,s)=>Math.round(n*t[s]))}return a},El=(e,t,r)=>{let i=(()=>{switch(r.keepAspectRatioPolicy){case"not_larger":return r.axes.length>0?Math.min(...r.axes.map(n=>t[n]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return r.axes.length>0?Math.max(...r.axes.map(n=>t[n]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${r.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return r.axes.length>0?(r.axes.forEach(n=>t[n]=i),r.axes.forEach(n=>a[n]=Math.round(e[n]*t[n]))):(t.fill(i,0,t.length),a.forEach((n,s)=>a[s]=Math.round(n*t[s]))),a},zl=(e,t,r,i,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${r.length}> {
      var original_indices: array<${e.type.value}, ${r.length}>;
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${G("uniforms.scales","i",i)};
        var roi_low = ${G("uniforms.roi","i",a)};
        var roi_hi = ${G("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${G("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${G("uniforms.output_shape","i",r.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,Cl=(e,t,r,i,a,n,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${G("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${G("uniforms.roi","i",n)};
          var roi_hi = ${G("uniforms.roi",`i + ${r.length}`,n)};
          var input_shape_i = ${G("uniforms.input_shape","i",r.length)};
          var output_shape_i = ${G("uniforms.output_shape","i",i.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,Al=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${G("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,sa=(e,t,r,i)=>e.rank>i?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",r,"batch")};
`:"",Ol=(e,t,r,i,a)=>{let[n,s,u,l]=r.length===2?[-1,0,1,-1]:[0,2,3,1],d=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${d} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${r[u]} - 1))`)};
      ${sa(e,l,n,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${d} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${d} = originalIndices[${s}];
      var col:${d} = originalIndices[${u}];
      ${i?`if (row < 0 || row > (${r[s]} - 1) || col < 0 || col > (${r[u]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${r[s]} - 1));
      col = max(0, min(col, ${r[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${r.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${r.length>2?`u32(originalIndices[${n}])`:"0"};
      var x11: ${d} = getInputValue(batch, channel, row1, col1);
      var x12: ${d} = getInputValue(batch, channel, row1, col2);
      var x21: ${d} = getInputValue(batch, channel, row2, col1);
      var x22: ${d} = getInputValue(batch, channel, row2, col2);
      var dx1: ${d} = abs(row - ${d}(row1));
      var dx2: ${d} = abs(${d}(row2) - row);
      var dy1: ${d} = abs(col - ${d}(col1));
      var dy2: ${d} = abs(${d}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Rl=(e,t,r,i,a,n,s,u,l,d)=>{let c=r.length===2,f=!0,[m,_]=c?[0,1]:f?[2,3]:[1,2],g=e.type.value,$=x=>{let v=x===m?"row":"col";return`
      fn ${v}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${g} {
        var output_index = ${t.indicesGet("output_indices",x)};
        var originalIdx: ${g} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[x]},
        ${i[x]}, ${r[x]}, ${n[x]}, ${n[x]} + ${r.length});
        var fractOriginalIdx: ${g} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${r[x]} - 1))) {
          return ${l};
        }
        var data: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${v}: ${g} = originalIdx + ${g}(i);
          if (${v} < 0 || ${v} >= ${r[x]}) {
            ${d?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${v} = max(0, min(${v}, ${r[x]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",x,`u32(${v})`)};
          data[i + 1] = ${x===m?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${$(m)};
    ${$(_)};
  fn getCubicInterpolationCoefs(s: ${g}) -> array<${g}, 4> {
    var absS = abs(s);
    var coeffs: array<${g}, 4> = array<${g}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${g} = 1.0 - absS;
    var twoMinusAbsS: ${g} = 2.0 - absS;
    var onePlusAbsS: ${g} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${g}, 4>, coefs: array<${g}, 4>) -> ${g} {
    var coefsSum: ${g} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${g} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Bl=(e,t,r,i,a)=>{let[n,s,u,l,d]=r.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${r[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${r[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${r[l]} - 1))`)};
      ${sa(e,d,n,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${s}];
      var height:${c} = originalIndices[${u}];
      var width:${c} = originalIndices[${l}];
      ${i?`if (depth < 0 || depth > (${r[s]} - 1) || height < 0 || height > (${r[u]} - 1) || width < 0 || (width > ${r[l]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${r[s]} - 1));
      height = max(0, min(height, ${r[u]} - 1));
      width = max(0, min(width, ${r[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${r.length>3?`u32(originalIndices[${d}])`:"0"};
      var batch: u32 =  ${r.length>3?`u32(originalIndices[${n}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Ml=(e,t,r,i,a,n)=>{let s=e.dims,u=Tl(n,t.axes,s.length),l=Il(s,i,a,t.axes),d=i.slice();i.length===0&&(d=s.map((b,k)=>b===0?1:l[k]/b),t.keepAspectRatioPolicy!=="stretch"&&(l=El(s,d,t)));let c=j("output",e.dataType,l.length),f=R("input",e.dataType,s.length),m=C.size(l),_=s.length===l.length&&s.every((b,k)=>b===l[k]),g=t.coordinateTransformMode==="tf_crop_and_resize",$=t.extrapolationValue,x=f.type.value,v=b=>`
      ${_?"":`
      ${Sl(t.coordinateTransformMode,x)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${Al(f,s)};
              ${kl(t.nearestMode,r,x)};
              ${Cl(f,c,s,l,d.length,u.length,g)};
              `;case"linear":return`
              ${zl(c,s,l,d.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Ol(f,c,s,g,$)}`;if(s.length===3||s.length===5)return`${Bl(f,c,s,g,$)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Rl(f,c,s,l,d,u,t.cubicCoeffA,g,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${b.registerUniform("output_size","u32").registerUniform("scales","f32",d.length).registerUniform("roi","f32",u.length).declareVariables(f,c)}
      ${b.mainStart()}
        ${b.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${f.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${f.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${r}|${d.length>0?t.mode==="cubic"?d:d.length:""}|${a.length>0?a:""}|${u.length>0?u:""}|${_}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:d},{type:1,data:u},...K(s,l)]})}},Nl=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},ff=(e,t)=>{let r=[],i=[],a=[],n=Nl(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");xl(e.inputs,t,n,r,i,a),e.compute(Ml(e.inputs[0],t,n,r,i,a),{inputs:[0]})},hf=e=>{let t=e.antialias,r=e.axes,i=e.coordinateTransformMode,a=e.cubicCoeffA,n=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,d=e.nearestMode===""?"simple":e.nearestMode;return pe({antialias:t,axes:r,coordinateTransformMode:i,cubicCoeffA:a,excludeOutside:n,extrapolationValue:s,keepAspectRatioPolicy:u,mode:l,nearestMode:d})}}),Dl,Pl,mf,Tg=P(()=>{"use strict";J(),ie(),ne(),Dl=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],r=e[1],i=e[2];if(t.dataType!==r.dataType||t.dataType!==i.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(r.dims.length!==3&&r.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],n=t.dims[t.dims.length-2];if(r.dims[r.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(r.dims[r.dims.length-2]!==n)throw new Error("Skip must have the same sequence length as input");if(i.dims.length!==1)throw new Error("Gamma must be 1D");if(i.dims[i.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},Pl=(e,t,r,i)=>{let a=t.simplified,n=e[0].dims,s=C.size(n),u=n,l=s,d=n.slice(-1)[0],c=i?n.slice(0,-1).concat(1):[],f=!a&&e.length>3,m=e.length>4,_=i&&r>1,g=i&&r>2,$=r>3,x=64,v=ye(d),b=[{type:12,data:l},{type:12,data:v},{type:12,data:d},{type:1,data:t.epsilon}],k=T=>{let E=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],z=[R("x",e[0].dataType,e[0].dims,v),R("skip",e[1].dataType,e[1].dims,v),R("gamma",e[2].dataType,e[2].dims,v)];f&&z.push(R("beta",e[3].dataType,e[3].dims,v)),m&&z.push(R("bias",e[4].dataType,e[4].dims,v)),z.push(j("output",e[0].dataType,u,v)),_&&z.push(j("mean_output",1,c)),g&&z.push(j("inv_std_output",1,c)),$&&z.push(j("input_skip_bias_sum",e[0].dataType,u,v));let B=Se(e[0].dataType),N=Se(1,v);return`

      ${T.registerUniforms(E).declareVariables(...z)}
      var<workgroup> sum_shared : array<${N}, ${x}>;
      var<workgroup> sum_squared_shared : array<${N}, ${x}>;

      ${T.mainStart([x,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${x};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${x};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${x-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${m?"bias[offset1d + i]":B+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${$?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Rt(B,v,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${x};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${ct("sum",v)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${ct("square_sum",v)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${g?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${B}(mean)`}) *
            ${B}(inv_std_dev) * gamma[offset1d + i]
            ${f?"+ beta[offset1d + i]":""};
        }
      }`},S=[{dims:u,dataType:e[0].dataType}];return r>1&&S.push({dims:c,dataType:1}),r>2&&S.push({dims:c,dataType:1}),r>3&&S.push({dims:n,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${v};${_};${g};${$}`,inputDependencies:e.map((T,E)=>"type")},getShaderSource:k,getRunData:()=>({outputs:S,dispatchGroup:{x:Math.ceil(l/d)},programUniforms:b})}},mf=(e,t)=>{Dl(e.inputs);let r=[0];e.outputCount>1&&r.push(-3),e.outputCount>2&&r.push(-3),e.outputCount>3&&r.push(3),e.compute(Pl(e.inputs,t,e.outputCount,!1),{outputs:r})}}),Ul,Qt,ql,oa,Wl,Ll,gf,_f,Ig=P(()=>{"use strict";J(),ie(),$e(),ne(),Ul=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((r,i)=>{if(e[i+1].dataType!==6&&e[i+1].dataType!==7)throw new Error(`Input ${i} must be an array of int32 or int64`)})},Qt=(e,t)=>{let r=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(i=>r.push(Number(i)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(i=>r.push(Number(i)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return r},ql=(e,t)=>{if(e.length>1){let r=Qt(e,1),i=Qt(e,2),a=Qt(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),pe({starts:r,ends:i,axes:a})}else return t},oa=(e,t,r,i,a)=>{let n=e;return e<0&&(n+=r[i[t]]),a[t]<0?Math.max(0,Math.min(n,r[i[t]]-1)):Math.max(0,Math.min(n,r[i[t]]))},Wl=(e,t,r)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${r.length}; i >= 0; i--) {
            let input_shape_i = ${G("uniforms.input_shape","i",r.length)};
            let steps_i = ${G("uniforms.steps","i",r.length)};
            let signs_i = ${G("uniforms.signs","i",r.length)};
            let starts_i = ${G("uniforms.starts","i",r.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Ll=(e,t)=>{let r=e[0].dims,i=C.size(r),a=t.axes.length>0?C.normalizeAxes(t.axes,r.length):[...Array(r.length).keys()],n=Qt(e,4);n.forEach(v=>v!==0||(()=>{throw new Error("step cannot be 0")})),n.length===0&&(n=Array(a.length).fill(1));let s=t.starts.map((v,b)=>oa(v,b,r,a,n)),u=t.ends.map((v,b)=>oa(v,b,r,a,n));if(a.length!==s.length||a.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==r.length)for(let v=0;v<r.length;++v)a.includes(v)||(s.splice(v,0,0),u.splice(v,0,r[v]),n.splice(v,0,1));let l=n.map(v=>Math.sign(v));n.forEach((v,b,k)=>{if(v<0){let S=(u[b]-s[b])/v,T=s[b],E=T+S*n[b];s[b]=E,u[b]=T,k[b]=-v}});let d=r.slice(0);a.forEach((v,b)=>{d[v]=Math.ceil((u[v]-s[v])/n[v])});let c={dims:d,dataType:e[0].dataType},f=j("output",e[0].dataType,d.length),m=R("input",e[0].dataType,e[0].dims.length),_=C.size(d),g=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:n.length}],$=[{type:12,data:_},{type:12,data:s},{type:6,data:l},{type:12,data:n},...K(e[0].dims,d)],x=v=>`
      ${v.registerUniforms(g).declareVariables(m,f)}
        ${Wl(m,f,r)}
        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${f.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${f.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${n.length}`,inputDependencies:["rank"]},getShaderSource:x,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(i/64)},programUniforms:$})}},gf=(e,t)=>{Ul(e.inputs,t);let r=ql(e.inputs,t);e.compute(Ll(e.inputs,r),{inputs:[0]})},_f=e=>{let t=e.starts,r=e.ends,i=e.axes;return pe({starts:t,ends:r,axes:i})}}),Vl,jl,yf,bf,Eg=P(()=>{"use strict";J(),ie(),$e(),ft(),ne(),Vl=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},jl=(e,t)=>{let r=e.inputs[0],i=r.dims,a=C.size(i),n=i.length,s=C.normalizeAxis(t.axis,n),u=s<i.length-1,l,d=[];u?(d=Array.from({length:n},(z,B)=>B),d[s]=n-1,d[n-1]=s,l=e.compute(Re(r,d),{inputs:[r],outputs:[-1]})[0]):l=r;let c=l.dims,f=c[n-1],m=a/f,_=ye(f),g=f/_,$=64;m===1&&($=256);let x=(z,B)=>B===4?`max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))`:B===2?`max(${z}.x, ${z}.y)`:B===3?`max(max(${z}.x, ${z}.y), ${z}.z)`:z,v=R("x",l.dataType,l.dims,_),b=j("result",l.dataType,l.dims,_),k=v.type.value,S=Se(l.dataType)==="f32"?`var threadMax = ${k}(-3.402823e+38f);`:`var threadMax = ${k}(-65504.0h);`,T=z=>`
      var<workgroup> rowMaxShared : ${k};
      var<workgroup> rowSumShared : ${k};
      var<workgroup> threadShared : array<${k}, ${$}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${k} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${k}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${z.registerUniform("packedCols","i32").declareVariables(v,b)}
      ${z.mainStart($)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${$};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${S}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${k}(${x("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${k}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${k}(${ct("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          let value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          setValue(row, col, row_stride, value);
        }
      }`,E=e.compute({name:"Softmax",shaderCache:{hint:`${_};${$}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:l.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:g}]}),getShaderSource:T},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(Re(E,d),{inputs:[E]})},yf=(e,t)=>{Vl(e.inputs),jl(e,t)},bf=e=>pe({axis:e.axis})}),ua,Gl,Hl,Fl,$f,zg=P(()=>{"use strict";J(),ie(),ne(),ua=e=>Array.from(e.getBigInt64Array(),Number),Gl=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(ua(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Hl=(e,t)=>{let r=[];for(let i=0;i<e.length;++i)r.push(e[i]*t[i]);return r},Fl=(e,t)=>{let r=e[0].dims,i=t??ua(e[1]),a=Hl(r,i),n=C.size(a),s=e[0].dataType,u=R("input",s,r.length),l=j("output",s,a.length),d=c=>`
      const inputShape = ${u.indices(...r)};
      ${c.registerUniform("output_size","u32").declareVariables(u,l)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${r.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${i}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},...K(e[0].dims,a)]}),getShaderSource:d}},$f=e=>{Gl(e.inputs),e.compute(Fl(e.inputs),{inputs:[0]})}}),Kl,Zl,wf,Cg=P(()=>{"use strict";J(),ie(),ne(),Kl=(e,t,r,i,a)=>{let n=j("output_data",a,r.length,4),s=R("a_data",t[1].dataType,t[1].dims.length,4),u=R("b_data",t[2].dataType,t[2].dims.length,4),l=R("c_data",t[0].dataType,t[0].dims.length,4),d,c=(f,m,_)=>`select(${m}, ${f}, ${_})`;if(!i)d=n.setByOffset("global_idx",c(s.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let f=(m,_,g="")=>{let $=`a_data[index_a${_}][component_a${_}]`,x=`b_data[index_b${_}][component_b${_}]`,v=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${n.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${s.broadcastedIndicesToOffset(`output_indices${_}`,n)};
            let offset_b${_} = ${u.broadcastedIndicesToOffset(`output_indices${_}`,n)};
            let offset_c${_} = ${l.broadcastedIndicesToOffset(`output_indices${_}`,n)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${m}[${_}] = ${g}(${c($,x,v)});
          `};a===9?d=`
            var data = vec4<u32>(0);
            ${f("data",0,"u32")}
            ${f("data",1,"u32")}
            ${f("data",2,"u32")}
            ${f("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:d=`
            ${f("output_data[global_idx]",0)}
            ${f("output_data[global_idx]",1)}
            ${f("output_data[global_idx]",2)}
            ${f("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,u,n)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${d}
      }`},Zl=e=>{let t=e[1].dims,r=e[2].dims,i=e[0].dims,a=e[1].dataType,n=!(C.areEqual(t,r)&&C.areEqual(r,i)),s=t,u=C.size(t);if(n){let d=Bt.calcShape(Bt.calcShape(t,r,!1),i,!1);if(!d)throw new Error("Can't perform where op on the given tensors");s=d,u=C.size(s)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:d=>Kl(d,e,s,n,a),getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...K(i,t,r,s)]})}},wf=e=>{e.compute(Zl(e.inputs))}}),vf,Ag=P(()=>{"use strict";Gm(),ja(),Hm(),Fm(),Km(),Zm(),Qm(),tg(),ig(),ag(),ng(),sg(),og(),ug(),lg(),dg(),pg(),cg(),fg(),hg(),mg(),gg(),_g(),yg(),bg(),qc(),$g(),wg(),vg(),xg(),Sg(),Va(),kg(),Gc(),Tg(),Ig(),Eg(),Vc(),zg(),ft(),Ga(),Cg(),vf=new Map([["Abs",[hp]],["Acos",[mp]],["Acosh",[gp]],["Add",[Qp]],["ArgMax",[dp,ba]],["ArgMin",[lp,ba]],["Asin",[_p]],["Asinh",[yp]],["Atan",[bp]],["Atanh",[$p]],["Attention",[pp]],["AveragePool",[ef,Jc]],["BatchNormalization",[cp]],["BiasAdd",[fp]],["BiasSplitGelu",[Zp]],["Cast",[vp,wp]],["Ceil",[Sp]],["Clip",[xp]],["Concat",[sc,oc]],["Conv",[ka,Sa]],["ConvTranspose",[_c,gc]],["Cos",[kp]],["Cosh",[Tp]],["CumSum",[yc,bc]],["DepthToSpace",[$c,wc]],["DequantizeLinear",[uf,lf]],["Div",[Xp]],["Einsum",[vc,xc]],["Elu",[Ip,tr]],["Equal",[Yp]],["Erf",[Ep]],["Exp",[zp]],["Expand",[Sc]],["FastGelu",[kc]],["Floor",[Cp]],["FusedConv",[ka,Sa]],["Gather",[Ic,Tc]],["GatherElements",[Rc,Oc]],["GatherBlockQuantized",[Cc,Ac]],["GatherND",[Ec,zc]],["Gelu",[Ap]],["Gemm",[Mc,Bc]],["GlobalAveragePool",[rf,tf]],["GlobalMaxPool",[of,sf]],["Greater",[rc]],["GreaterOrEqual",[ac]],["GridSample",[Nc,Dc]],["GroupQueryAttention",[Hc]],["HardSigmoid",[Up,Pp]],["InstanceNormalization",[Fc]],["LayerNormalization",[Kc]],["LeakyRelu",[Op,tr]],["Less",[ic]],["LessOrEqual",[nc]],["Log",[Fp]],["MatMul",[Zc]],["MatMulNBits",[Qc,Xc]],["MaxPool",[af,nf]],["Mul",[Jp]],["MultiHeadAttention",[Uc,Pc]],["Neg",[Bp]],["Not",[Rp]],["Pad",[Yc]],["Pow",[ec]],["QuickGelu",[Kp,tr]],["Range",[df]],["Reciprocal",[Mp]],["ReduceMin",[ap]],["ReduceMean",[Jd]],["ReduceMax",[ip]],["ReduceSum",[sp]],["ReduceProd",[np]],["ReduceL1",[ep]],["ReduceL2",[tp]],["ReduceLogSum",[up]],["ReduceLogSumExp",[rp]],["ReduceSumSquare",[op]],["Relu",[Np]],["Resize",[ff,hf]],["RotaryEmbedding",[jc]],["ScatterND",[cf,pf]],["Sigmoid",[Dp]],["Sin",[qp]],["Sinh",[Wp]],["Slice",[gf,_f]],["SkipLayerNormalization",[mf]],["Split",[Wc,Lc]],["Sqrt",[Lp]],["Softmax",[yf,bf]],["Sub",[tc]],["Tan",[Vp]],["Tanh",[jp]],["ThresholdedRelu",[Hp,tr]],["Tile",[$f]],["Transpose",[Wd,Ld]],["Where",[wf]]])}),xf,Og=P(()=>{"use strict";Ge(),rt(),ne(),xf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,r,i,a){Xe(e.programInfo.name);let n=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let d of t)u.push({binding:u.length,resource:{buffer:d.buffer}});for(let d of r)u.push({binding:u.length,resource:{buffer:d.buffer}});a&&u.push({binding:u.length,resource:a});let l=n.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let d={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:i};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(d)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...i),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),je(e.programInfo.name)}dispose(){}build(e,t){Xe(e.name);let r=this.backend.device,i=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(d=>{r.features.has(d.feature)&&i.push(`enable ${d.extension};`)});let a=qd(t,this.backend.device.limits),n=e.getShaderSource(a),s=`${i.join(`
`)}
${a.additionalImplementations}
${n}`,u=r.createShaderModule({code:s,label:e.name});ue("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=r.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return je(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,r=typeof e=="number"?1:e.y||1,i=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&r<=a&&i<=a)return[t,r,i];let n=t*r*i,s=Math.ceil(Math.sqrt(n));if(s>a){if(s=Math.ceil(Math.cbrt(n)),s>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),Sf={};Nt(Sf,{WebGpuBackend:()=>kf});var Ql,Xl,Yl,kf,Rg=P(()=>{"use strict";Ge(),J(),rt(),Md(),Vm(),Ag(),Og(),Ql=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let r=[];for(let i=0;i<e.length;++i){let a=e[i].dataType;switch(t[i]){case"none":{r.push("");break}case"type":{r.push(`${a}`);break}case"rank":{let n=e[i].dims.length;r.push(`${a};${n}`);break}case"dims":{let n=e[i].dims.join(",");r.push(`${a};${n}`);break}default:throw new Error(`unsupported input dependency: ${t[i]}`)}}return r.join("|")},Xl=(e,t,r)=>{let i=e.name;return e.shaderCache?.hint&&(i+="["+e.shaderCache.hint+"]"),i+=":"+r+`:${Ql(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,i},Yl=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},kf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let r=[],i={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:r},a=n=>t.features.has(n)&&r.push(n)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(i),this.adapterInfo=new Yl(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Pd(this),this.programManager=new xf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,Ua(e.logLevel,!!e.debug),this.device.onuncapturederror=n=>{n.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${n.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Xe(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),r=this.pendingQueries.get(e);for(let i=0;i<t.length/2;i++){let a=r[i],n=a.kernelId,s=this.kernels.get(n),u=s.kernelType,l=s.kernelName,d=a.programName,c=a.inputTensorViews,f=a.outputTensorViews,m=t[i*2],_=t[i*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=m);let g=Number(m-this.queryTimeBase),$=Number(_-this.queryTimeBase);if(!Number.isSafeInteger(g)||!Number.isSafeInteger($))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(x=>({dims:x.dims,dataType:tt(x.dataType)})),outputsMetadata:f.map(x=>({dims:x.dims,dataType:tt(x.dataType)})),kernelId:n,kernelType:u,kernelName:l,programName:d,startTime:g,endTime:$});else{let x="";c.forEach((b,k)=>{x+=`input[${k}]: [${b.dims}] | ${tt(b.dataType)}, `});let v="";f.forEach((b,k)=>{v+=`output[${k}]: [${b.dims}] | ${tt(b.dataType)}, `}),console.log(`[profiling] kernel "${n}|${u}|${l}|${d}" ${x}${v}execution time: ${$-g} ns`)}Nr("GPU",`${d}::${m}::${_}`)}e.unmap(),this.pendingQueries.delete(e)}),je()}run(e,t,r,i,a,n){Xe(e.name);let s=[];for(let b=0;b<t.length;++b){let k=t[b].data;if(k===0)continue;let S=this.gpuDataManager.get(k);if(!S)throw new Error(`no GPU data for input: ${k}`);s.push(S)}let{outputs:u,dispatchGroup:l,programUniforms:d}=e.getRunData(t),c=r.length===0?u.map((b,k)=>k):r;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let f=[],m=[];for(let b=0;b<u.length;++b){if(!Number.isInteger(c[b])||c[b]<-3||c[b]>=n)throw new Error(`Invalid output index: ${c[b]}`);if(c[b]===-3)continue;let k=c[b]===-1,S=c[b]===-2,T=k||S?a(u[b].dataType,u[b].dims):i(c[b],u[b].dataType,u[b].dims);if(f.push(T),T.data===0)continue;let E=this.gpuDataManager.get(T.data);if(!E)throw new Error(`no GPU data for output: ${T.data}`);if(k&&this.temporaryData.push(E),S){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(E)}m.push(E)}if(s.length!==t.length||m.length!==f.length){if(m.length===0)return je(e.name),f;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let _;if(d){let b=0,k=[];d.forEach(z=>{let B=typeof z.data=="number"?[z.data]:z.data;if(B.length===0)return;let N=z.type===10?2:4,V,Q;z.type===10?(Q=B.length>4?16:B.length>2?8:B.length*N,V=B.length>4?16:N*B.length):(Q=B.length<=2?B.length*N:16,V=16),b=Math.ceil(b/Q)*Q,k.push(b);let F=z.type===10?8:4;b+=B.length>4?Math.ceil(B.length/F)*V:B.length*N});let S=16;b=Math.ceil(b/S)*S;let T=new ArrayBuffer(b);d.forEach((z,B)=>{let N=k[B],V=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(T,N,V.length).set(V);else if(z.type===12)new Uint32Array(T,N,V.length).set(V);else if(z.type===10)new Uint16Array(T,N,V.length).set(V);else if(z.type===1)new Float32Array(T,N,V.length).set(V);else throw new Error(`Unsupported uniform type: ${tt(z.type)}`)});let E=this.gpuDataManager.create(b,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(E.buffer,0,T,0,b),this.gpuDataManager.release(E.id),_={offset:0,size:b,buffer:E.buffer}}let g=this.programManager.normalizeDispatchGroupSize(l),$=g[1]===1&&g[2]===1,x=Xl(e,t,$),v=this.programManager.getArtifact(x);if(v||(v=this.programManager.build(e,g),this.programManager.setArtifact(x,v),ue("info",()=>`[artifact] key: ${x}, programName: ${e.name}`)),d&&v.uniformVariablesInfo){if(d.length!==v.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${v.uniformVariablesInfo.length}, got ${d.length} in program "${v.programInfo.name}".`);for(let b=0;b<d.length;b++){let k=d[b],S=k.type,T=typeof k.data=="number"?1:k.data.length,[E,z]=v.uniformVariablesInfo[b];if(S!==E||T!==z)throw new Error(`Uniform variable ${b} mismatch: expect type ${E} with size ${z}, got type ${S} with size ${T} in program "${v.programInfo.name}".`)}}if(ue("info",()=>`[ProgramManager] run "${e.name}" (key=${x}) with ${g[0]}x${g[1]}x${g[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let b={kernelId:this.currentKernelId,programName:v.programInfo.name,inputTensorViews:t,outputTensorViews:f};this.pendingKernels.push(b),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push(b)}return this.programManager.run(v,s,m,g,_),je(e.name),f}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,r,i){let a=vf.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let n={kernelType:e,kernelName:i,kernelEntry:a[0],attributes:[a[1],r]};this.kernels.set(t,n)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let r of t)this.gpuDataManager.release(r.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,r){let i=this.kernels.get(e);if(!i)throw new Error(`kernel not created: ${e}`);let a=i.kernelType,n=i.kernelName,s=i.kernelEntry,u=i.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${n}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),ue("info",()=>`[WebGPU] Start to run kernel "[${a}] ${n}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,u[1]),0}catch(d){return r.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${n}" failed. ${d}`)),1}finally{l&&r.push(this.device.popErrorScope().then(d=>d?`GPU validation error for kernel "[${a}] ${n}": ${d.message}`:null));for(let d of this.temporaryData)this.gpuDataManager.release(d.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,r,i){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let n=a.get(t),s=this.gpuDataManager.registerExternalBuffer(r,i,n);return a.set(t,[s,r]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(r=>this.gpuDataManager.unregisterExternalBuffer(r[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,r){return async()=>{let i=await ga(this,e,t);return qa(i.buffer,r)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){ue("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){ue("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){ue("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),r=e.length;this.pendingKernels=[];for(let i=0;i<r;i++){let a=this.getComputePassEncoder(),n=e[i];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(n.computePipeline),a.setBindGroup(0,n.bindGroup),a.dispatchWorkgroups(...n.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[i]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Tf={};Nt(Tf,{init:()=>If});var Ar,Jl,If,Bg=P(()=>{"use strict";J(),rt(),ie(),Lm(),Ar=class Ef{constructor(t,r,i,a){this.module=t,this.dataType=r,this.data=i,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=C.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=C.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=C.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=C.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(C.size(t)!==C.size(this.dims))throw new Error("Invalid new shape");return new Ef(this.module,this.dataType,this.data,t)}},Jl=class{constructor(e,t,r){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let i=e.PTR_SIZE,a=r/e.PTR_SIZE,n=i===4?"i32":"i64";this.opKernelContext=Number(e.getValue(i*a++,n));let s=Number(e.getValue(i*a++,n));this.outputCount=Number(e.getValue(i*a++,n)),this.customDataOffset=Number(e.getValue(i*a++,"*")),this.customDataSize=Number(e.getValue(i*a++,n));let u=[];for(let l=0;l<s;l++){let d=Number(e.getValue(i*a++,n)),c=Number(e.getValue(i*a++,"*")),f=Number(e.getValue(i*a++,n)),m=[];for(let _=0;_<f;_++)m.push(Number(e.getValue(i*a++,n)));u.push(new Ar(e,d,c,m))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let r=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,i=t?.outputs??[],a=(s,u,l)=>new Ar(this.module,u,this.output(s,l),l),n=(s,u)=>{let l=wt(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let d=l>0?this.backend.gpuDataManager.create(l).id:0;return new Ar(this.module,s,d,u)};return this.backend.run(e,r,i,a,n,this.outputCount)}output(e,t){let r=this.module.stackSave();try{let i=this.module.PTR_SIZE,a=i===4?"i32":"i64",n=this.module.stackAlloc((1+t.length)*i);this.module.setValue(n,t.length,a);for(let s=0;s<t.length;s++)this.module.setValue(n+i*(s+1),t[s],a);return this.module._JsepOutput(this.opKernelContext,e,n)}catch(i){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${i}`)}finally{this.module.stackRestore(r)}}},If=async(e,t,r,i)=>{let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let n=(Rg(),ar(Sf)).WebGpuBackend,s=new n;await s.initialize(r,i),a("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,l,d,c=!1)=>{if(c)ue("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(d)}`),s.memcpy(Number(u),Number(l));else{ue("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(d)}`);let f=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(d));s.upload(Number(l),f)}},async(u,l,d)=>{ue("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${d}`),await s.download(Number(u),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+d)>>>0))},(u,l,d)=>s.createKernel(u,Number(l),d,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),u=>s.releaseKernel(u),(u,l,d,c)=>{ue("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${d}, kernel=${u}, contextDataOffset=${l}`);let f=new Jl(t,s,Number(l));return s.computeKernel(Number(u),f,c)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let n=new Dd(r);a("webnn",[n,()=>n.reserveTensorId(),s=>n.releaseTensorId(s),async(s,u,l,d,c)=>n.ensureTensor(s,u,l,d,c),(s,u)=>{n.uploadTensor(s,u)},async(s,u)=>n.downloadTensor(s,u)])}}}),ed,Xa,Ya,dt,td,la,Vr,Ja,en,da,tn,rn,an,zf=P(()=>{"use strict";Um(),qm(),J(),kt(),Ba(),Ad(),ed=(e,t)=>{ge()._OrtInit(e,t)!==0&&ce("Can't initialize onnxruntime.")},Xa=async e=>{ed(e.wasm.numThreads,Pr(e.logLevel))},Ya=async(e,t)=>{ge().asyncInit?.();{let r=(Bg(),ar(Tf)).init;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");let i=e.webgpu.adapter;if(i){if(typeof i.limits!="object"||typeof i.features!="object"||typeof i.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let a=e.webgpu.powerPreference;if(a!==void 0&&a!=="low-power"&&a!=="high-performance")throw new Error(`Invalid powerPreference setting: "${a}"`);let n=e.webgpu.forceFallbackAdapter;if(n!==void 0&&typeof n!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${n}"`);if(i=await navigator.gpu.requestAdapter({powerPreference:a,forceFallbackAdapter:n}),!i)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}await r("webgpu",ge(),e,i)}if(t==="webnn"){if(typeof navigator>"u"||!navigator.ml)throw new Error("WebNN is not supported in current environment");await r("webnn",ge(),e)}}},dt=new Map,td=e=>{let t=ge(),r=t.stackSave();try{let i=t.PTR_SIZE,a=t.stackAlloc(2*i);t._OrtGetInputOutputCount(e,a,a+i)!==0&&ce("Can't get session input/output count.");let n=i===4?"i32":"i64";return[Number(t.getValue(a,n)),Number(t.getValue(a+i,n))]}finally{t.stackRestore(r)}},la=(e,t)=>{let r=ge(),i=r.stackSave(),a=0;try{let n=r.PTR_SIZE,s=r.stackAlloc(2*n);r._OrtGetInputOutputMetadata(e,t,s,s+n)!==0&&ce("Can't get session input/output metadata.");let u=Number(r.getValue(s,"*"));a=Number(r.getValue(s+n,"*"));let l=r.HEAP32[a/4];if(l===0)return[u,0];let d=r.HEAPU32[a/4+1],c=[];for(let f=0;f<d;f++){let m=Number(r.getValue(a+8+f*n,"*"));c.push(m!==0?r.UTF8ToString(m):Number(r.getValue(a+8+(f+d)*n,"*")))}return[u,l,c]}finally{r.stackRestore(i),a!==0&&r._OrtFree(a)}},Vr=e=>{let t=ge(),r=t._malloc(e.byteLength);if(r===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,r),[r,e.byteLength]},Ja=async(e,t)=>{let r,i,a=ge();Array.isArray(e)?[r,i]=e:e.buffer===a.HEAPU8.buffer?[r,i]=[e.byteOffset,e.byteLength]:[r,i]=Vr(e);let n=0,s=0,u=0,l=[],d=[],c=[];try{if([s,l]=await Cd(t),t?.externalData&&a.mountExternalData){let S=[];for(let T of t.externalData){let E=typeof T=="string"?T:T.path;S.push(Pa(typeof T=="string"?T:T.data).then(z=>{a.mountExternalData(E,z)}))}await Promise.all(S)}for(let S of t?.executionProviders??[])if((typeof S=="string"?S:S.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof S!="string"){let T=S,E=T?.context,z=T?.gpuDevice,B=T?.deviceType,N=T?.powerPreference;E?a.currentContext=E:z?a.currentContext=await a.webnnCreateMLContext(z):a.currentContext=await a.webnnCreateMLContext({deviceType:B,powerPreference:N})}else a.currentContext=await a.webnnCreateMLContext();break}n=await a._OrtCreateSession(r,i,s),a.webgpuOnCreateSession?.(n),n===0&&ce("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.webnnRegisterMLContext(n,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[f,m]=td(n),_=!!t?.enableGraphCapture,g=[],$=[],x=[],v=[],b=[];for(let S=0;S<f;S++){let[T,E,z]=la(n,S);T===0&&ce("Can't get an input name."),d.push(T);let B=a.UTF8ToString(T);g.push(B),x.push(E===0?{name:B,isTensor:!1}:{name:B,isTensor:!0,type:tt(E),shape:z})}for(let S=0;S<m;S++){let[T,E,z]=la(n,S+f);T===0&&ce("Can't get an output name."),c.push(T);let B=a.UTF8ToString(T);$.push(B),v.push(E===0?{name:B,isTensor:!1}:{name:B,isTensor:!0,type:tt(E),shape:z});{if(_&&t?.preferredOutputLocation===void 0){b.push("gpu-buffer");continue}let N=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[B]??"cpu";if(N!=="cpu"&&N!=="cpu-pinned"&&N!=="gpu-buffer"&&N!=="ml-tensor")throw new Error(`Not supported preferred output location: ${N}.`);if(_&&N!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${N}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);b.push(N)}}let k=null;return b.some(S=>S==="gpu-buffer"||S==="ml-tensor")&&(u=a._OrtCreateBinding(n),u===0&&ce("Can't create IO binding."),k={handle:u,outputPreferredLocations:b,outputPreferredLocationsEncoded:b.map(S=>ha(S))}),dt.set(n,[n,d,c,k,_,!1]),[n,g,$,x,v]}catch(f){throw d.forEach(m=>a._OrtFree(m)),c.forEach(m=>a._OrtFree(m)),u!==0&&a._OrtReleaseBinding(u)!==0&&ce("Can't release IO binding."),n!==0&&a._OrtReleaseSession(n)!==0&&ce("Can't release session."),f}finally{a._free(r),s!==0&&a._OrtReleaseSessionOptions(s)!==0&&ce("Can't release session options."),l.forEach(f=>a._free(f)),a.unmountExternalData?.()}},en=e=>{let t=ge(),r=dt.get(e);if(!r)throw new Error(`cannot release session. invalid session id: ${e}`);let[i,a,n,s,u]=r;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&ce("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&ce("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),a.forEach(l=>t._OrtFree(l)),n.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(i)!==0&&ce("Can't release session."),dt.delete(e)},da=async(e,t,r,i,a,n,s=!1)=>{if(!e){t.push(0);return}let u=ge(),l=u.PTR_SIZE,d=e[0],c=e[1],f=e[3],m=f,_,g;if(d==="string"&&(f==="gpu-buffer"||f==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&f!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);if(f==="gpu-buffer"){let v=e[2].gpuBuffer;g=wt(At(d),c);{let b=u.jsepRegisterBuffer;if(!b)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');_=b(i,n,v,g)}}else if(f==="ml-tensor"){let v=e[2].mlTensor;g=wt(At(d),c);let b=u.webnnRegisterMLTensor;if(!b)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');_=b(i,v,At(d),c)}else{let v=e[2];if(Array.isArray(v)){g=l*v.length,_=u._malloc(g),r.push(_);for(let b=0;b<v.length;b++){if(typeof v[b]!="string")throw new TypeError(`tensor data at index ${b} is not a string`);u.setValue(_+b*l,Ve(v[b],r),"*")}}else{let b=u.webnnIsGraphInput;if(d!=="string"&&b){let k=u.UTF8ToString(a);if(b(i,k)){let S=At(d);g=wt(S,c),m="ml-tensor";let T=u.webnnCreateTemporaryTensor,E=u.webnnUploadTensor;if(!T||!E)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let z=await T(i,S,c);E(z,new Uint8Array(v.buffer,v.byteOffset,v.byteLength)),_=z}else g=v.byteLength,_=u._malloc(g),r.push(_),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,g),_)}else g=v.byteLength,_=u._malloc(g),r.push(_),u.HEAPU8.set(new Uint8Array(v.buffer,v.byteOffset,g),_)}}let $=u.stackSave(),x=u.stackAlloc(4*c.length);try{c.forEach((b,k)=>u.setValue(x+k*l,b,l===4?"i32":"i64"));let v=u._OrtCreateTensor(At(d),_,g,x,c.length,ha(m));v===0&&ce(`Can't create tensor for input/output. session=${i}, index=${n}.`),t.push(v)}finally{u.stackRestore($)}},tn=async(e,t,r,i,a,n)=>{let s=ge(),u=s.PTR_SIZE,l=dt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let d=l[0],c=l[1],f=l[2],m=l[3],_=l[4],g=l[5],$=t.length,x=i.length,v=0,b=[],k=[],S=[],T=[],E=s.stackSave(),z=s.stackAlloc($*u),B=s.stackAlloc($*u),N=s.stackAlloc(x*u),V=s.stackAlloc(x*u);try{[v,b]=zd(n);for(let U=0;U<$;U++)await da(r[U],k,T,e,c[t[U]],t[U],_);for(let U=0;U<x;U++)await da(a[U],S,T,e,f[i[U]],$+i[U],_);for(let U=0;U<$;U++)s.setValue(z+U*u,k[U],"*"),s.setValue(B+U*u,c[t[U]],"*");for(let U=0;U<x;U++)s.setValue(N+U*u,S[U],"*"),s.setValue(V+U*u,f[i[U]],"*");if(m&&!g){let{handle:U,outputPreferredLocations:ee,outputPreferredLocationsEncoded:oe}=m;if(c.length!==$)throw new Error(`input count from feeds (${$}) is expected to be always equal to model's input count (${c.length}).`);for(let L=0;L<$;L++){let Y=t[L];await s._OrtBindInput(U,c[Y],k[L])!==0&&ce(`Can't bind input[${L}] for session=${e}.`)}for(let L=0;L<x;L++){let Y=i[L];a[L]?.[3]?s._OrtBindOutput(U,f[Y],S[L],0)!==0&&ce(`Can't bind pre-allocated output[${L}] for session=${e}.`):s._OrtBindOutput(U,f[Y],0,oe[Y])!==0&&ce(`Can't bind output[${L}] to ${ee[L]} for session=${e}.`)}dt.set(e,[d,c,f,m,_,!0])}s.jsepOnRunStart?.(d),s.webnnOnRunStart?.(d);let Q;m?Q=await s._OrtRunWithBinding(d,m.handle,x,N,v):Q=await s._OrtRun(d,B,z,$,V,x,N,v),Q!==0&&ce("failed to call OrtRun().");let F=[];for(let U=0;U<x;U++){let ee=Number(s.getValue(N+U*u,"*"));if(ee===S[U]){F.push(a[U]);continue}let oe=s.stackSave(),L=s.stackAlloc(4*u),Y=!1,re,X=0;try{s._OrtGetTensorData(ee,L,L+u,L+2*u,L+3*u)!==0&&ce(`Can't access output tensor data on index ${U}.`);let fe=u===4?"i32":"i64",M=Number(s.getValue(L,fe));X=s.getValue(L+u,"*");let W=s.getValue(L+u*2,"*"),te=Number(s.getValue(L+u*3,fe)),A=[];for(let be=0;be<te;be++)A.push(Number(s.getValue(W+be*u,fe)));s._OrtFree(W)!==0&&ce("Can't free memory for tensor dims.");let ae=A.reduce((be,ve)=>be*ve,1);re=tt(M);let De=m?.outputPreferredLocations[i[U]];if(re==="string"){if(De==="gpu-buffer"||De==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let be=[];for(let ve=0;ve<ae;ve++){let He=s.getValue(X+ve*u,"*"),Pt=s.getValue(X+(ve+1)*u,"*"),ze=ve===ae-1?void 0:Pt-He;be.push(s.UTF8ToString(He,ze))}F.push([re,A,be,"cpu"])}else if(De==="gpu-buffer"&&ae>0){let be=s.jsepGetBuffer;if(!be)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let ve=be(X),He=wt(M,ae);if(He===void 0||!Na(re))throw new Error(`Unsupported data type: ${re}`);Y=!0,F.push([re,A,{gpuBuffer:ve,download:s.jsepCreateDownloader(ve,He,re),dispose:()=>{s._OrtReleaseTensor(ee)!==0&&ce("Can't release tensor.")}},"gpu-buffer"])}else if(De==="ml-tensor"&&ae>0){let be=s.webnnEnsureTensor,ve=s.webnnIsInt64Supported;if(!be||!ve)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(wt(M,ae)===void 0||!Da(re))throw new Error(`Unsupported data type: ${re}`);if(re==="int64"&&!ve(e))throw new Error('preferredLocation "ml-tensor" for int64 output is not supported by current WebNN Context.');let He=await be(e,X,M,A,!1);Y=!0,F.push([re,A,{mlTensor:He,download:s.webnnCreateMLTensorDownloader(X,re),dispose:()=>{s.webnnReleaseTensorId(X),s._OrtReleaseTensor(ee)}},"ml-tensor"])}else{let be=Ma(re),ve=new be(ae);new Uint8Array(ve.buffer,ve.byteOffset,ve.byteLength).set(s.HEAPU8.subarray(X,X+ve.byteLength)),F.push([re,A,ve,"cpu"])}}finally{s.stackRestore(oe),re==="string"&&X&&s._free(X),Y||s._OrtReleaseTensor(ee),s.webnnOnRunEnd?.(d)}}return m&&!_&&(s._OrtClearBoundOutputs(m.handle)!==0&&ce("Can't clear bound outputs."),dt.set(e,[d,c,f,m,_,!1])),F}finally{s.stackRestore(E),k.forEach(Q=>s._OrtReleaseTensor(Q)),S.forEach(Q=>s._OrtReleaseTensor(Q)),T.forEach(Q=>s._free(Q)),v!==0&&s._OrtReleaseRunOptions(v),b.forEach(Q=>s._free(Q))}},rn=e=>{let t=ge(),r=dt.get(e);if(!r)throw new Error("invalid session id");let i=r[0],a=t._OrtEndProfiling(i);a===0&&ce("Can't get an profile file name."),t._OrtFree(a)},an=e=>{let t=[];for(let r of e){let i=r[2];!Array.isArray(i)&&"buffer"in i&&t.push(i.buffer)}return t}}),pt,Me,Ct,Xt,Yt,Or,pa,Rr,yt,bt,rd,Cf,Af,Of,Rf,Bf,Mf,Nf,Df=P(()=>{"use strict";Ge(),zf(),kt(),Oa(),pt=()=>!!me.wasm.proxy&&typeof document<"u",Ct=!1,Xt=!1,Yt=!1,Rr=new Map,yt=(e,t)=>{let r=Rr.get(e);r?r.push(t):Rr.set(e,[t])},bt=()=>{if(Ct||!Xt||Yt||!Me)throw new Error("worker not ready")},rd=e=>{switch(e.data.type){case"init-wasm":Ct=!1,e.data.err?(Yt=!0,pa[1](e.data.err)):(Xt=!0,pa[0]()),Or&&(URL.revokeObjectURL(Or),Or=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Rr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Cf=async()=>{if(!Xt){if(Ct)throw new Error("multiple calls to 'initWasm()' detected.");if(Yt)throw new Error("previous call to 'initWasm()' failed.");if(Ct=!0,pt())return new Promise((e,t)=>{Me?.terminate(),Id().then(([r,i])=>{try{Me=i,Me.onerror=n=>t(n),Me.onmessage=rd,pa=[e,t];let a={type:"init-wasm",in:me};!a.in.wasm.wasmPaths&&(r||fa)&&(a.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),Me.postMessage(a),Or=r}catch(a){t(a)}},t)});try{await Ra(me.wasm),await Xa(me),Xt=!0}catch(e){throw Yt=!0,e}finally{Ct=!1}}},Af=async e=>{if(pt())return bt(),new Promise((t,r)=>{yt("init-ep",[t,r]);let i={type:"init-ep",in:{epName:e,env:me}};Me.postMessage(i)});await Ya(me,e)},Of=async e=>pt()?(bt(),new Promise((t,r)=>{yt("copy-from",[t,r]);let i={type:"copy-from",in:{buffer:e}};Me.postMessage(i,[e.buffer])})):Vr(e),Rf=async(e,t)=>{if(pt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return bt(),new Promise((r,i)=>{yt("create",[r,i]);let a={type:"create",in:{model:e,options:{...t}}},n=[];e instanceof Uint8Array&&n.push(e.buffer),Me.postMessage(a,n)})}else return Ja(e,t)},Bf=async e=>{if(pt())return bt(),new Promise((t,r)=>{yt("release",[t,r]);let i={type:"release",in:e};Me.postMessage(i)});en(e)},Mf=async(e,t,r,i,a,n)=>{if(pt()){if(r.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return bt(),new Promise((s,u)=>{yt("run",[s,u]);let l=r,d={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:i,options:n}};Me.postMessage(d,an(l))})}else return tn(e,t,r,i,a,n)},Nf=async e=>{if(pt())return bt(),new Promise((t,r)=>{yt("end-profiling",[t,r]);let i={type:"end-profiling",in:e};Me.postMessage(i)});rn(e)}}),ca,id,Pf,Mg=P(()=>{"use strict";Ge(),Df(),J(),Aa(),Ad(),ca=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},id=e=>{switch(e[3]){case"cpu":return new xe(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Na(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:r,download:i,dispose:a}=e[2];return xe.fromGpuBuffer(r,{dataType:t,dims:e[1],download:i,dispose:a})}case"ml-tensor":{let t=e[0];if(!Da(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:r,download:i,dispose:a}=e[2];return xe.fromMLTensor(r,{dataType:t,dims:e[1],download:i,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},Pf=class{async fetchModelAndCopyToWasmMemory(e){return Of(await Pa(e))}async loadModel(e,t){Xe();let r;typeof e=="string"?r=await this.fetchModelAndCopyToWasmMemory(e):r=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Rf(r,t),je()}async dispose(){return Bf(this.sessionId)}async run(e,t,r){Xe();let i=[],a=[];Object.entries(e).forEach(f=>{let m=f[0],_=f[1],g=this.inputNames.indexOf(m);if(g===-1)throw new Error(`invalid input '${m}'`);i.push(_),a.push(g)});let n=[],s=[];Object.entries(t).forEach(f=>{let m=f[0],_=f[1],g=this.outputNames.indexOf(m);if(g===-1)throw new Error(`invalid output '${m}'`);n.push(_),s.push(g)});let u=i.map((f,m)=>ca(f,()=>`input "${this.inputNames[a[m]]}"`)),l=n.map((f,m)=>f?ca(f,()=>`output "${this.outputNames[s[m]]}"`):null),d=await Mf(this.sessionId,a,u,s,l,r),c={};for(let f=0;f<d.length;f++)c[this.outputNames[s[f]]]=n[f]??id(d[f]);return je(),c}startProfiling(){}endProfiling(){Nf(this.sessionId)}}}),Uf={};Nt(Uf,{OnnxruntimeWebAssemblyBackend:()=>Ea,initializeFlags:()=>Ia,wasmBackend:()=>qf});var Ia,Ea,qf,Ng=P(()=>{"use strict";Ge(),Df(),Mg(),Ia=()=>{(typeof me.wasm.initTimeout!="number"||me.wasm.initTimeout<0)&&(me.wasm.initTimeout=0);let e=me.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),me.wasm.simd=!1),typeof me.wasm.proxy!="boolean"&&(me.wasm.proxy=!1),typeof me.wasm.trace!="boolean"&&(me.wasm.trace=!1),typeof me.wasm.numThreads!="number"||!Number.isInteger(me.wasm.numThreads)||me.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)me.wasm.numThreads=1;else{let t=typeof navigator>"u"?wm("node:os").cpus().length:navigator.hardwareConcurrency;me.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Ea=class{async init(e){Ia(),await Cf(),await Af(e)}async createInferenceSessionHandler(e,t){let r=new Pf;return await r.loadModel(e,t),r}},qf=new Ea});Ge();Ge();Ge();var Dg="1.22.0-dev.20250409-89f8206ba4";{let e=(Ng(),ar(Uf)).wasmBackend;Ot("webgpu",e,5),Ot("webnn",e,5),Ot("cpu",e,10),Ot("wasm",e,10)}Object.defineProperty(me.versions,"web",{value:Dg,enumerable:!0});me.wasm.wasmPaths=new URL("./",self.location.href).href;me.wasm.numThreads=1;var Wf=5,sr="",Dt=null,ln=null,jf=null,Gf=null,Hf=null,Ff=null,Gr=null,nn=new Map,Lf=Promise.resolve(),sn=0;async function Kf(e,t){let r=null;try{r=await caches.open("xenon-voices");let d=await r.match(e);if(d){let c=new Uint8Array(await d.arrayBuffer());return t&&t(c.length),c}}catch{r=null}let i=await fetch(e);if(!i.ok)throw new Error(`The voice could not be downloaded (${i.status}).`);let a=i.body.getReader(),n=[],s=0;for(;;){let{done:d,value:c}=await a.read();if(d)break;n.push(c),s+=c.length,t&&t(c.length)}let u=new Uint8Array(s),l=0;for(let d of n)u.set(d,l),l+=d.length;if(r)try{await r.put(e,new Response(u))}catch{}return u}var dn=async e=>JSON.parse(new TextDecoder().decode(await Kf(e)));function Ug(e){return Gr||=(async()=>{sr=e,Dt=await dn(`${sr}/onnx/tts.json`),ln=await dn(`${sr}/onnx/unicode_indexer.json`);let t=0,r=0,i=n=>{t+=n,Date.now()-r>250&&(r=Date.now(),postMessage({type:"progress",loaded:t}))},a=async n=>jr.create(await Kf(`${sr}/onnx/${n}.onnx`,i),{executionProviders:["wasm"],graphOptimizationLevel:"all"});jf=await a("duration_predictor"),Gf=await a("text_encoder"),Hf=await a("vector_estimator"),Ff=await a("vocoder")})(),Gr}async function Zf(e){return nn.has(e)||nn.set(e,(async()=>{let t=await dn(`${sr}/voice_styles/${e}.json`),r=i=>new xe("float32",Float32Array.from(i.data.flat(1/0)),i.dims);return{ttl:r(t.style_ttl),dp:r(t.style_dp)}})()),nn.get(e)}var or=["zero","one","two","three","four","five","six","seven","eight","nine","ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],qg=["","","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"];function on(e){let t=Math.floor(e/100),r=e%100,i=r<20?or[r]:qg[Math.floor(r/10)]+(r%10?`-${or[r%10]}`:"");return t?`${or[t]} hundred${r?` ${i}`:""}`:i}function ur(e){if(e<1e3)return on(e);let t=[];for(let[r,i]of[[1e12,"trillion"],[1e9,"billion"],[1e6,"million"],[1e3,"thousand"]])e>=r&&(t.push(`${on(Math.floor(e/r)%1e3)} ${i}`),e%=r);return e&&t.push(on(e)),t.join(" ")}function Wg(e){let t=Math.floor(e/100),r=e%100;return e>=2e3&&e<2010?ur(e):`${ur(t)} ${r===0?"hundred":r<10?`oh ${or[r]}`:ur(r)}`}var un=e=>e.split("").map(t=>or[+t]).join(" "),Lg={one:"first",two:"second",three:"third",five:"fifth",eight:"eighth",nine:"ninth",twelve:"twelfth"};function Vg(e){return ur(e).replace(/([a-z]+)$/,t=>Lg[t]||(t.endsWith("y")?`${t.slice(0,-1)}ieth`:`${t}th`))}function jg(e){return e.replace(/\b(\d+)(st|nd|rd|th)\b/g,(t,r)=>` ${Vg(Number(r))} `).replace(/(\d+(?:,\d{3})*)(?:\.(\d+))?(%?)/g,(t,r,i,a,n,s)=>{if(/[A-Za-z_]/.test(s[n-1]||"")||/[A-Za-z_]/.test(s[n+t.length]||""))return t;let u=r.replace(/,/g,""),l=Number(u);if(!Number.isSafeInteger(l))return` ${un(u)} `;let d=!i&&!r.includes(",")&&u.length===4&&l>=1100&&l<2100?Wg(l):u.length>1&&u[0]==="0"?un(u):ur(l);return i&&(d+=` point ${un(i)}`),` ${d}${a?" percent":""} `})}function Qf(e){let t=jg(String(e)).normalize("NFKD").replace(/[–‑—]/g,"-").replace(/_/g," ").replace(/[“”]/g,'"').replace(/[‘’´`]/g,"'").replace(/[[\]|/#→←]/g," ").replace(/[♥☆♡©\\]/g,"").replace(/@/g," at ").replace(/ ([,.!?;:'])/g,"$1").replace(/\s+/g," ").trim();return/[.!?;:,'")\]}…]$/.test(t)||(t+="."),`<en>${t}</en>`}function Gg(e){let t=new Float32Array(e);for(let r=0;r<e;r++){let i=Math.max(1e-4,Math.random()),a=Math.random();t[r]=Math.sqrt(-2*Math.log(i))*Math.cos(2*Math.PI*a)}return t}async function Vf(e,t,r){let i=Qf(e),a=[];for(let k of i){let S=k.codePointAt(0);a.push(S<ln.length?ln[S]:-1)}let n=a.length,s=new xe("int64",BigInt64Array.from(a.map(BigInt)),[1,n]),u=new xe("float32",new Float32Array(n).fill(1),[1,1,n]),l=await Zf(t),d=(await jf.run({text_ids:s,style_dp:l.dp,text_mask:u})).duration.data[0]/(1.05*(r||1)),c=(await Gf.run({text_ids:s,style_ttl:l.ttl,text_mask:u})).text_emb,f=Dt.ae.sample_rate,m=Dt.ae.base_chunk_size*Dt.ttl.chunk_compress_factor,_=Dt.ttl.latent_dim*Dt.ttl.chunk_compress_factor,g=Math.max(1,Math.floor((Math.floor(d*f)+m-1)/m)),$=Gg(_*g),x=new xe("float32",new Float32Array(g).fill(1),[1,1,g]),v=new xe("float32",Float32Array.from([Wf]),[1]);for(let k=0;k<Wf;k++){let S=await Hf.run({noisy_latent:new xe("float32",$,[1,_,g]),text_emb:c,style_ttl:l.ttl,latent_mask:x,text_mask:u,current_step:new xe("float32",Float32Array.from([k]),[1]),total_step:v});$=new Float32Array(S.denoised_latent.data)}let b=(await Ff.run({latent:new xe("float32",$,[1,_,g])})).wav_tts.data;return{samples:Float32Array.from(b.subarray(0,Math.min(b.length,Math.floor(d*f)))),rate:f}}onmessage=e=>{let t=e.data||{};t.type==="load"?Ug(t.base).then(()=>Zf("F3")).then(()=>Vf("Ready.","F3",1)).then(()=>postMessage({type:"ready"}),r=>{Gr=null,postMessage({type:"failed",message:String(r&&r.message||r)})}):t.type==="epoch"?sn=Math.max(sn,Number(t.epoch)||0):t.type==="speak"?Lf=Lf.then(async()=>{try{if((Number(t.epoch)||0)<sn){postMessage({type:"error",id:t.id,message:"skipped"});return}await Gr;let{samples:r,rate:i}=await Vf(String(t.text),t.voice||"F3",Number(t.speed)||1);postMessage({type:"audio",id:t.id,samples:r,rate:i},[r.buffer])}catch(r){postMessage({type:"error",id:t.id,message:String(r&&r.message||r)})}}):t.type==="words"&&postMessage({type:"words",id:t.id,text:Qf(String(t.text))})};
/*! Bundled license information:

onnxruntime-web/dist/ort.webgpu.bundle.min.mjs:
  (*!
   * ONNX Runtime Web v1.22.0-dev.20250409-89f8206ba4
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)

onnxruntime-web/dist/ort.webgpu.bundle.min.mjs:
  (**
   * @license
   * Copyright 2021 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2020 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2019 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
*/
