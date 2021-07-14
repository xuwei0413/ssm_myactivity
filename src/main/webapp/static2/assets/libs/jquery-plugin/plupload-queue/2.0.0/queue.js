define("jquery-plugin/plupload-queue/2.0.0/queue", ["./plupload", "./moxie", "$"], function (a) {
    var b = a("./plupload"),
        c = a("$");
    ! function (a) {
        function c(a) {
            return b.translate(a) || a
        }

        function d(b, d) {
            d.contents().each(function (b, c) {
                c = a(c), c.is(".plupload") || c.remove()
            }), d.prepend('<div class="plupload_wrapper plupload_scroll"><div id="' + b + '_container" class="plupload_container"><div class="plupload"><div class="plupload_header"><div class="plupload_header_content"><div class="plupload_header_title">' + c("Select files") + '</div><div class="plupload_header_text">' + c("Add files to the upload queue and click the start button.") + '</div></div></div><div class="plupload_content"><div class="plupload_filelist_header"><div class="plupload_file_name">' + c("Filename") + '</div><div class="plupload_file_action">&nbsp;</div><div class="plupload_file_status"><span>' + c("Status") + '</span></div><div class="plupload_file_size">' + c("Size") + '</div><div class="plupload_clearer">&nbsp;</div></div><ul id="' + b + '_filelist" class="plupload_filelist"></ul><div class="plupload_filelist_footer"><div class="plupload_file_name"><div class="plupload_buttons"><a href="#" class="plupload_button plupload_add" id="' + b + '_browse">' + c("Add Files") + '</a><a href="#" class="plupload_button plupload_start">' + c("Start Upload") + '</a></div><span class="plupload_upload_status"></span></div><div class="plupload_file_action"></div><div class="plupload_file_status"><span class="plupload_total_status">0%</span></div><div class="plupload_file_size"><span class="plupload_total_file_size">0 b</span></div><div class="plupload_progress"><div class="plupload_progress_container"><div class="plupload_progress_bar"></div></div></div><div class="plupload_clearer">&nbsp;</div></div></div></div></div><input type="hidden" id="' + b + '_count" name="' + b + '_count" value="0" /></div>')
        }
        var e = {};
        a.fn.pluploadQueue = function (f) {
            return f ? (this.each(function () {
                function g(c) {
                    var d;
                    c.status == b.DONE && (d = "plupload_done"), c.status == b.FAILED && (d = "plupload_failed"), c.status == b.QUEUED && (d = "plupload_delete"), c.status == b.UPLOADING && (d = "plupload_uploading");
                    var e = a("#" + c.id).attr("class", d).find("a").css("display", "block");
                    c.hint && e.attr("title", c.hint)
                }

                function h() {
                    a("span.plupload_total_status", l).html(k.total.percent + "%"), a("div.plupload_progress_bar", l).css("width", k.total.percent + "%"), a("span.plupload_upload_status", l).html(c("Uploaded %d/%d files").replace(/%d\/%d/, k.total.uploaded + "/" + k.files.length))
                }

                function i() {
                    var d, e = a("ul.plupload_filelist", l).html(""),
                        f = 0;
                    a.each(k.files, function (c, h) {
                        d = "", h.status == b.DONE && (h.target_name && (d += '<input type="hidden" name="' + m + "_" + f + '_tmpname" value="' + b.xmlEncode(h.target_name) + '" />'), d += '<input type="hidden" name="' + m + "_" + f + '_name" value="' + b.xmlEncode(h.name) + '" />', d += '<input type="hidden" name="' + m + "_" + f + '_status" value="' + (h.status == b.DONE ? "done" : "failed") + '" />', f++, a("#" + m + "_count").val(f)), e.append('<li id="' + h.id + '"><div class="plupload_file_name"><span>' + h.name + '</span></div><div class="plupload_file_action"><a href="#"></a></div><div class="plupload_file_status">' + h.percent + '%</div><div class="plupload_file_size">' + b.formatSize(h.size) + '</div><div class="plupload_clearer">&nbsp;</div>' + d + "</li>"), g(h), a("#" + h.id + ".plupload_delete a").click(function (b) {
                            a("#" + h.id).remove(), k.removeFile(h), b.preventDefault()
                        })
                    }), a("span.plupload_total_file_size", l).html(b.formatSize(k.total.size)), 0 === k.total.queued ? a("span.plupload_add_text", l).html(c("Add Files")) : a("span.plupload_add_text", l).html(c("%d files queued").replace(/%d/, k.total.queued)), a("a.plupload_start", l).toggleClass("plupload_disabled", k.files.length == k.total.uploaded + k.total.failed), e[0].scrollTop = e[0].scrollHeight, h(), !k.files.length && k.features.dragdrop && k.settings.dragdrop && a("#" + m + "_filelist").append('<li class="plupload_droptext">' + c("Drag files here.") + "</li>")
                }

                function j() {
                    delete e[m], k.destroy(), l.html(n), k = l = n = null
                }
                var k, l, m, n;
                l = a(this), m = l.attr("id"), m || (m = b.guid(), l.attr("id", m)), n = l.html(), d(m, l), k = new b.Uploader(a.extend({
                    dragdrop: !0,
                    browse_button: m + "_browse",
                    container: m
                }, f)), e[m] = k, k.bind("UploadFile", function (b, c) {
                    a("#" + c.id).addClass("plupload_current_file")
                }), k.bind("Init", function (b, c) {
                    !f.unique_names && f.rename && l.on("click", "#" + m + "_filelist div.plupload_file_name span", function (c) {
                        var d, e, f, g = a(c.target),
                            h = "";
                        d = b.getFile(g.parents("li")[0].id), f = d.name, e = /^(.+)(\.[^.]+)$/.exec(f), e && (f = e[1], h = e[2]), g.hide().after('<input type="text" />'), g.next().val(f).focus().blur(function () {
                            g.show().next().remove()
                        }).keydown(function (b) {
                            var c = a(this);
                            13 == b.keyCode && (b.preventDefault(), d.name = c.val() + h, g.html(d.name), c.blur())
                        })
                    }), b.settings.dragdrop && (b.settings.drop_element = m + "_filelist"), a("#" + m + "_container").attr("title", "Using runtime: " + c.runtime), a("a.plupload_start", l).click(function (b) {
                        a(this).hasClass("plupload_disabled") || k.start(), b.preventDefault()
                    }), a("a.plupload_stop", l).click(function (a) {
                        a.preventDefault(), k.stop()
                    }), a("a.plupload_start", l).addClass("plupload_disabled")
                }), k.bind("Error", function (d, e) {
                    var f, g = e.file;
                    g && (f = e.message, e.details && (f += " (" + e.details + ")"), e.code == b.FILE_SIZE_ERROR && alert(c("Error: File too large:") + " " + g.name), e.code == b.FILE_EXTENSION_ERROR && alert(c("Error: Invalid file extension:") + " " + g.name), g.hint = f, a("#" + g.id).attr("class", "plupload_failed").find("a").css("display", "block").attr("title", f)), e.code === b.INIT_ERROR && setTimeout(function () {
                        j()
                    }, 1)
                }), k.bind("PostInit", function (b) {
                    b.settings.dragdrop && b.features.dragdrop && a("#" + m + "_filelist").append('<li class="plupload_droptext">' + c("Drag files here.") + "</li>")
                }), k.init(), k.bind("StateChanged", function () {
                    k.state === b.STARTED ? (a("li.plupload_delete a,div.plupload_buttons", l).hide(), a("span.plupload_upload_status,div.plupload_progress,a.plupload_stop", l).css("display", "block"), a("span.plupload_upload_status", l).html("Uploaded " + k.total.uploaded + "/" + k.files.length + " files"), f.multiple_queues && a("span.plupload_total_status,span.plupload_total_file_size", l).show()) : (i(), a("a.plupload_stop,div.plupload_progress", l).hide(), a("a.plupload_delete", l).css("display", "block"), f.multiple_queues && k.total.uploaded + k.total.failed == k.files.length && (a(".plupload_buttons,.plupload_upload_status", l).css("display", "inline"), a(".plupload_start", l).addClass("plupload_disabled"), a("span.plupload_total_status,span.plupload_total_file_size", l).hide()))
                }), k.bind("QueueChanged", i), k.bind("FileUploaded", function (a, b) {
                    g(b)
                }), k.bind("UploadProgress", function (b, c) {
                    a("#" + c.id + " div.plupload_file_status", l).html(c.percent + "%"), g(c), h()
                }), f.setup && f.setup(k)
            }), this) : e[a(this[0]).attr("id")]
        }
    }(c)
}), define("jquery-plugin/plupload-queue/2.0.0/plupload", ["jquery-plugin/plupload-queue/2.0.0/moxie"], function (a, b, c) {
    var d = a("jquery-plugin/plupload-queue/2.0.0/moxie");
    ! function (b, c, d) {
        function e(a) {
            function b(a, b, c) {
                var e = {
                    chunks: "slice_blob",
                    resize: "send_binary_string",
                    jpgresize: "send_binary_string",
                    pngresize: "send_binary_string",
                    progress: "report_upload_progress",
                    multi_selection: "select_multiple",
                    max_file_size: "access_binary",
                    dragdrop: "drag_and_drop",
                    drop_element: "drag_and_drop",
                    headers: "send_custom_headers",
                    canSendBinary: "send_binary",
                    triggerDialog: "summon_file_dialog"
                };
                e[a] ? d[e[a]] = b : c || (d[a] = b)
            }
            var c = a.required_features,
                d = {};
            return "string" == typeof c ? h.each(c.split(/\s*,\s*/), function (a) {
                b(a, !0)
            }) : "object" == typeof c ? h.each(c, function (a, c) {
                b(c, a)
            }) : c === !0 && (a.multipart || (d.send_binary_string = !0), a.chunk_size > 0 && (d.slice_blob = !0), h.each(a, function (a, c) {
                b(c, !!a, !0)
            })), d
        }
        var f = b.setTimeout,
            g = {},
            h = {
                VERSION: "2.0.0beta",
                STOPPED: 1,
                STARTED: 2,
                QUEUED: 1,
                UPLOADING: 2,
                FAILED: 4,
                DONE: 5,
                GENERIC_ERROR: -100,
                HTTP_ERROR: -200,
                IO_ERROR: -300,
                SECURITY_ERROR: -400,
                INIT_ERROR: -500,
                FILE_SIZE_ERROR: -600,
                FILE_EXTENSION_ERROR: -601,
                FILE_DUPLICATE_ERROR: -602,
                IMAGE_FORMAT_ERROR: -700,
                IMAGE_MEMORY_ERROR: -701,
                IMAGE_DIMENSIONS_ERROR: -702,
                mimeTypes: c.mimes,
                ua: c.ua,
                typeOf: c.typeOf,
                extend: c.extend,
                guid: c.guid,
                each: c.each,
                getPos: c.getPos,
                getSize: c.getSize,
                xmlEncode: function (a) {
                    var b = {
                            "<": "lt",
                            ">": "gt",
                            "&": "amp",
                            '"': "quot",
                            "'": "#39"
                        },
                        c = /[<>&\"\']/g;
                    return a ? ("" + a).replace(c, function (a) {
                        return b[a] ? "&" + b[a] + ";" : a
                    }) : a
                }, toArray: c.toArray,
                inArray: c.inArray,
                addI18n: c.addI18n,
                translate: c.translate,
                isEmptyObj: c.isEmptyObj,
                hasClass: c.hasClass,
                addClass: c.addClass,
                removeClass: c.removeClass,
                getStyle: c.getStyle,
                addEvent: c.addEvent,
                removeEvent: c.removeEvent,
                removeAllEvents: c.removeAllEvents,
                cleanName: function (a) {
                    var b, c;
                    for (c = [/[\300-\306]/g, "A", /[\340-\346]/g, "a", /\307/g, "C", /\347/g, "c", /[\310-\313]/g, "E", /[\350-\353]/g, "e", /[\314-\317]/g, "I", /[\354-\357]/g, "i", /\321/g, "N", /\361/g, "n", /[\322-\330]/g, "O", /[\362-\370]/g, "o", /[\331-\334]/g, "U", /[\371-\374]/g, "u"], b = 0; b < c.length; b += 2) a = a.replace(c[b], c[b + 1]);
                    return a = a.replace(/\s+/g, "_"), a = a.replace(/[^a-z0-9_\-\.]+/gi, "")
                }, buildUrl: function (a, b) {
                    var c = "";
                    return h.each(b, function (a, b) {
                        c += (c ? "&" : "") + encodeURIComponent(b) + "=" + encodeURIComponent(a)
                    }), c && (a += (a.indexOf("?") > 0 ? "&" : "?") + c), a
                }, formatSize: function (a) {
                    return a === d || /\D/.test(a) ? h.translate("N/A") : a > 1099511627776 ? Math.round(a / 1099511627776, 1) + " " + h.translate("tb") : a > 1073741824 ? Math.round(a / 1073741824, 1) + " " + h.translate("gb") : a > 1048576 ? Math.round(a / 1048576, 1) + " " + h.translate("mb") : a > 1024 ? Math.round(a / 1024, 1) + " " + h.translate("kb") : a + " " + h.translate("b")
                }, parseSize: c.parseSizeStr,
                predictRuntime: function (a, b) {
                    var c, d;
                    return b && (a.runtimes = b), c = new h.Uploader(a), d = c.runtime, c.destroy(), d
                }, addFileFilter: function (a, b) {
                    g[a] = b
                }
            };
        h.addFileFilter("mime_types", function () {
            function a(a) {
                var b = [];
                return h.each(a, function (a) {
                    h.each(a.extensions.split(/,/), function (a) {
                        /^\s*\*\s*$/.test(a) ? b.push("\\.*") : b.push("\\." + a.replace(new RegExp("[" + "/^$.*+?|()[]{}\\".replace(/./g, "\\$&") + "]", "g"), "\\$&"))
                    })
                }), new RegExp("(" + b.join("|") + ")$", "i")
            }
            var b, c;
            return function (d, e, f) {
                c && d == b || (c = a(d), b = [].slice.call(d)), c.test(e.name) ? f(!0) : (this.trigger("Error", {
                    code: h.FILE_EXTENSION_ERROR,
                    message: h.translate("File extension error."),
                    file: e
                }), f(!1))
            }
        }()), h.addFileFilter("max_file_size", function (a, b, c) {
            var d;
            b.size !== d && a && b.size > a ? (this.trigger("Error", {
                code: h.FILE_SIZE_ERROR,
                message: h.translate("File size error."),
                file: b
            }), c(!1)) : c(!0)
        }), h.addFileFilter("prevent_duplicates", function (a, b, c) {
            if (a)
                for (var d = this.files.length; d--;)
                    if (b.name === this.files[d].name && b.size === this.files[d].size) return this.trigger("Error", {
                        code: h.FILE_DUPLICATE_ERROR,
                        message: h.translate("Duplicate file error."),
                        file: b
                    }), c(!1), void 0;
            c(!0)
        }), h.Uploader = function (b) {
            function i() {
                var a, b, c = 0;
                if (this.state == h.STARTED) {
                    for (b = 0; b < t.length; b++) a || t[b].status != h.QUEUED ? c++ : (a = t[b], this.trigger("BeforeUpload", a) && (a.status = h.UPLOADING, this.trigger("UploadFile", a)));
                    c == t.length && (this.state !== h.STOPPED && (this.state = h.STOPPED, this.trigger("StateChanged")), this.trigger("UploadComplete", t))
                }
            }

            function j(a) {
                a.percent = a.size > 0 ? Math.ceil(100 * (a.loaded / a.size)) : 100, k()
            }

            function k() {
                var a, b;
                for (p.reset(), a = 0; a < t.length; a++) b = t[a], b.size !== d ? (p.size += b.origSize, p.loaded += b.loaded * b.origSize / b.size) : p.size = d, b.status == h.DONE ? p.uploaded++ : b.status == h.FAILED ? p.failed++ : p.queued++;
                p.size === d ? p.percent = t.length > 0 ? Math.ceil(100 * (p.uploaded / t.length)) : 0 : (p.bytesPerSec = Math.ceil(p.loaded / ((+new Date - o || 1) / 1e3)), p.percent = p.size > 0 ? Math.ceil(100 * (p.loaded / p.size)) : 0)
            }

            function l() {
                var a = this,
                    d = 0,
                    e = {
                        accept: b.filters.mime_types,
                        runtime_order: b.runtimes,
                        required_caps: v,
                        swf_url: b.flash_swf_url,
                        xap_url: b.silverlight_xap_url
                    };
                h.each(b.runtimes.split(/\s*,\s*/), function (a) {
                    b[a] && (e[a] = b[a])
                }), c.inSeries([
                    function (f) {
                        b.browse_button ? (q = new c.FileInput(h.extend({}, e, {
                            name: b.file_data_name,
                            multiple: b.multi_selection,
                            container: b.container,
                            browse_button: b.browse_button
                        })), q.onready = function () {
                            var b = c.Runtime.getInfo(this.ruid);
                            c.extend(a.features, {
                                chunks: b.can("slice_blob"),
                                multipart: b.can("send_multipart"),
                                multi_selection: b.can("select_multiple")
                            }), d++, f()
                        }, q.onchange = function () {
                            a.addFile(this.files)
                        }, q.bind("mouseenter mouseleave mousedown mouseup", function (a) {
                            if (!w) {
                                var d = c.get(b.browse_button);
                                d && (b.browse_button_hover && ("mouseenter" === a.type ? c.addClass(d, b.browse_button_hover) : "mouseleave" === a.type && c.removeClass(d, b.browse_button_hover)), b.browse_button_active && ("mousedown" === a.type ? c.addClass(d, b.browse_button_active) : "mouseup" === a.type && c.removeClass(d, b.browse_button_active)), d = null)
                            }
                        }), q.bind("error runtimeerror", function () {
                            q = null, f()
                        }), q.init()) : f()
                    },
                    function (f) {
                        b.drop_element ? (r = new c.FileDrop(h.extend({}, e, {
                            drop_zone: b.drop_element
                        })), r.onready = function () {
                            var b = c.Runtime.getInfo(this.ruid);
                            a.features.dragdrop = b.can("drag_and_drop"), d++, f()
                        }, r.ondrop = function () {
                            a.addFile(this.files)
                        }, r.bind("error runtimeerror", function () {
                            r = null, f()
                        }), r.init()) : f()
                    }
                ], function () {
                    "function" == typeof b.init ? b.init(a) : h.each(b.init, function (b, c) {
                        a.bind(c, b)
                    }), d ? a.trigger("PostInit") : a.trigger("Error", {
                        code: h.INIT_ERROR,
                        message: h.translate("Init error.")
                    })
                })
            }

            function m(a, b) {
                if (a.ruid) {
                    var d = c.Runtime.getInfo(a.ruid);
                    if (d) return d.can(b)
                }
                return !1
            }

            function n(a, b, d) {
                var e = new c.Image;
                try {
                    e.onload = function () {
                        e.downsize(b.width, b.height, b.crop, b.preserve_headers)
                    }, e.onresize = function () {
                        d(this.getAsBlob(a.type, b.quality)), this.destroy()
                    }, e.onerror = function () {
                        d(a)
                    }, e.load(a)
                } catch (f) {
                    d(a)
                }
            }
            var o, p, q, r, s, t = [],
                u = {},
                v = {},
                w = !1;
            p = new h.QueueProgress, b = h.extend({
                runtimes: c.Runtime.order,
                max_retries: 0,
                multipart: !0,
                multi_selection: !0,
                file_data_name: "file",
                flash_swf_url: a.resolve("./Moxie.swf#"),
                silverlight_xap_url: a.resolve("./Moxie.xap#"),
                send_chunk_number: !0
            }, b), b.resize && (b.resize = h.extend({
                preserve_headers: !0,
                crop: !1
            }, b.resize)), "array" === h.typeOf(b.filters) && (b.filters = {
                mime_types: b.filters
            }), b.filters = h.extend({
                mime_types: [],
                prevent_duplicates: !!b.prevent_duplicates,
                max_file_size: b.max_file_size
            }, b.filters), b.filters.max_file_size = h.parseSize(b.filters.max_file_size) || 0, b.chunk_size = h.parseSize(b.chunk_size) || 0, b.required_features = v = e(h.extend({}, b)), h.extend(this, {
                id: h.guid(),
                state: h.STOPPED,
                features: {},
                runtime: c.Runtime.thatCan(v, b.runtimes),
                files: t,
                settings: b,
                total: p,
                init: function () {
                    var a = this;
                    return b.browse_button = c.get(b.browse_button), b.drop_element = c.get(b.drop_element), "function" == typeof b.preinit ? b.preinit(a) : h.each(b.preinit, function (b, c) {
                        a.bind(c, b)
                    }), b.browse_button && b.url ? (a.bind("FilesAdded", function (b, c) {
                        [].push.apply(t, c), f(function () {
                            a.trigger("QueueChanged"), a.refresh()
                        }, 1)
                    }), a.bind("CancelUpload", function () {
                        s && s.abort()
                    }), b.unique_names && a.bind("BeforeUpload", function (a, b) {
                        var c = b.name.match(/\.([^.]+)$/),
                            d = "part";
                        c && (d = c[1]), b.target_name = b.id + "." + d
                    }), a.bind("UploadFile", function (a, d) {
                        function e() {
                            o-- > 0 ? f(g, 1) : (d.loaded = p, a.trigger("Error", {
                                code: h.HTTP_ERROR,
                                message: h.translate("HTTP Error."),
                                file: d,
                                response: s.responseText,
                                status: s.status,
                                responseHeaders: s.getAllResponseHeaders()
                            }))
                        }

                        function g() {
                            var m, n, o, q;
                            d.status != h.DONE && d.status != h.FAILED && a.state != h.STOPPED && (o = {
                                name: d.target_name || d.name
                            }, l && k.chunks && i.size > l ? (q = Math.min(l, i.size - p), m = i.slice(p, p + q)) : (q = i.size, m = i), l && k.chunks && (b.send_chunk_number ? (o.chunk = Math.ceil(p / l), o.chunks = Math.ceil(i.size / l)) : (o.offset = p, o.total = i.size)), s = new c.XMLHttpRequest, s.upload && (s.upload.onprogress = function (b) {
                                d.loaded = Math.min(d.size, p + b.loaded), a.trigger("UploadProgress", d)
                            }), s.onload = function () {
                                return s.status >= 400 ? (e(), void 0) : (q < i.size ? (m.destroy(), p += q, d.loaded = Math.min(p, i.size), a.trigger("ChunkUploaded", d, {
                                    offset: d.loaded,
                                    total: i.size,
                                    response: s.responseText,
                                    status: s.status,
                                    responseHeaders: s.getAllResponseHeaders()
                                }), "Android Browser" === c.Env.browser && a.trigger("UploadProgress", d)) : d.loaded = d.size, m = n = null, !p || p >= i.size ? (d.size != d.origSize && (i.destroy(), i = null), a.trigger("UploadProgress", d), d.status = h.DONE, a.trigger("FileUploaded", d, {
                                    response: s.responseText,
                                    status: s.status,
                                    responseHeaders: s.getAllResponseHeaders()
                                })) : f(g, 1), void 0)
                            }, s.onerror = function () {
                                e()
                            }, s.onloadend = function () {
                                this.destroy(), s = null
                            }, a.settings.multipart && k.multipart ? (o.name = d.target_name || d.name, s.open("post", j, !0), h.each(a.settings.headers, function (a, b) {
                                s.setRequestHeader(b, a)
                            }), n = new c.FormData, h.each(h.extend(o, a.settings.multipart_params), function (a, b) {
                                n.append(b, a)
                            }), n.append(a.settings.file_data_name, m), s.send(n, {
                                runtime_order: a.settings.runtimes,
                                required_caps: v,
                                swf_url: a.settings.flash_swf_url,
                                xap_url: a.settings.silverlight_xap_url
                            })) : (j = h.buildUrl(a.settings.url, h.extend(o, a.settings.multipart_params)), s.open("post", j, !0), s.setRequestHeader("Content-Type", "application/octet-stream"), h.each(a.settings.headers, function (a, b) {
                                s.setRequestHeader(b, a)
                            }), s.send(m, {
                                runtime_order: a.settings.runtimes,
                                required_caps: v,
                                swf_url: a.settings.flash_swf_url,
                                xap_url: a.settings.silverlight_xap_url
                            })))
                        }
                        var i, j = a.settings.url,
                            k = a.features,
                            l = b.chunk_size,
                            o = b.max_retries,
                            p = 0;
                        d.loaded && (p = d.loaded = l * Math.floor(d.loaded / l)), i = d.getSource(), !c.isEmptyObj(a.settings.resize) && m(i, "send_binary_string") && ~c.inArray(i.type, ["image/jpeg", "image/png"]) ? n.call(this, i, a.settings.resize, function (a) {
                            i = a, d.size = a.size, g()
                        }) : g()
                    }), a.bind("UploadProgress", function (a, b) {
                        j(b)
                    }), a.bind("StateChanged", function (a) {
                        if (a.state == h.STARTED) o = +new Date;
                        else if (a.state == h.STOPPED)
                            for (var b = a.files.length - 1; b >= 0; b--) a.files[b].status == h.UPLOADING && (a.files[b].status = h.QUEUED, k())
                    }), a.bind("QueueChanged", k), a.bind("Error", function (b, c) {
                        c.file && (c.file.status = h.FAILED, j(c.file), b.state == h.STARTED && f(function () {
                            i.call(a)
                        }, 1))
                    }), a.bind("FileUploaded", function () {
                        k(), f(function () {
                            i.call(a)
                        }, 1)
                    }), a.trigger("Init", {
                        runtime: this.runtime
                    }), l.call(this), void 0) : (this.trigger("Error", {
                        code: h.INIT_ERROR,
                        message: h.translate("Init error.")
                    }), void 0)
                }, refresh: function () {
                    q && q.trigger("Refresh"), this.trigger("Refresh")
                }, start: function () {
                    this.state != h.STARTED && (this.state = h.STARTED, this.trigger("StateChanged"), i.call(this))
                }, stop: function () {
                    this.state != h.STOPPED && (this.state = h.STOPPED, this.trigger("StateChanged"), this.trigger("CancelUpload"))
                }, disableBrowse: function () {
                    w = arguments[0] !== d ? arguments[0] : !0, q && q.disable(w), this.trigger("DisableBrowse", w)
                }, getFile: function (a) {
                    var b;
                    for (b = t.length - 1; b >= 0; b--)
                        if (t[b].id === a) return t[b]
                }, addFile: function (a, b) {
                    function d() {
                        var a = r || q;
                        return a ? a.getRuntime().uid : !1
                    }

                    function e(a, b) {
                        var d = [];
                        c.each(j.settings.filters, function (b, c) {
                            g[c] && d.push(function (d) {
                                g[c].call(j, b, a, function (a) {
                                    d(!a)
                                })
                            })
                        }), c.inSeries(d, b)
                    }

                    function f(a) {
                        var d = c.typeOf(a);
                        if (a instanceof c.File) {
                            if (!a.ruid && !a.isDetached()) {
                                if (!i) return !1;
                                a.ruid = i, a.connectRuntime(i)
                            }
                            f(new h.File(a))
                        } else a instanceof c.Blob ? (f(a.getSource()), a.destroy()) : a instanceof h.File ? (b && (a.name = b), k.push(function (b) {
                            e(a, function (c) {
                                c || l.push(a), b()
                            })
                        })) : -1 !== c.inArray(d, ["file", "blob"]) ? f(new c.File(null, a)) : "node" === d && "filelist" === c.typeOf(a.files) ? c.each(a.files, f) : "array" === d && (b = null, c.each(a, f))
                    }
                    var i, j = this,
                        k = [],
                        l = [];
                    i = d(), f(a), k.length && c.inSeries(k, function () {
                        l.length && j.trigger("FilesAdded", l)
                    })
                }, removeFile: function (a) {
                    for (var b = "string" == typeof a ? a : a.id, c = t.length - 1; c >= 0; c--)
                        if (t[c].id === b) return this.splice(c, 1)[0]
                }, splice: function (a, b) {
                    var c = t.splice(a === d ? 0 : a, b === d ? t.length : b);
                    return this.trigger("FilesRemoved", c), this.trigger("QueueChanged"), h.each(c, function (a) {
                        a.destroy()
                    }), c
                }, trigger: function (a) {
                    var b, c, d = u[a.toLowerCase()];
                    if (d)
                        for (c = Array.prototype.slice.call(arguments), c[0] = this, b = 0; b < d.length; b++)
                            if (d[b].func.apply(d[b].scope, c) === !1) return !1;
                    return !0
                }, hasEventListener: function (a) {
                    return !!u[a.toLowerCase()]
                }, bind: function (a, b, c) {
                    var d;
                    a = a.toLowerCase(), d = u[a] || [], d.push({
                        func: b,
                        scope: c || this
                    }), u[a] = d
                }, unbind: function (a) {
                    a = a.toLowerCase();
                    var b, c = u[a],
                        e = arguments[1];
                    if (c) {
                        if (e !== d) {
                            for (b = c.length - 1; b >= 0; b--)
                                if (c[b].func === e) {
                                    c.splice(b, 1);
                                    break
                                }
                        } else c = [];
                        c.length || delete u[a]
                    }
                }, unbindAll: function () {
                    var a = this;
                    h.each(u, function (b, c) {
                        a.unbind(c)
                    })
                }, destroy: function () {
                    this.stop(), h.each(t, function (a) {
                        a.destroy()
                    }), t = [], q && (q.destroy(), q = null), r && (r.destroy(), r = null), v = {}, o = p = w = s = null, this.trigger("Destroy"), this.unbindAll(), u = {}
                }
            })
        }, h.File = function () {
            function a(a) {
                h.extend(this, {
                    id: h.guid(),
                    name: a.name || a.fileName,
                    type: a.type || "",
                    size: a.size || a.fileSize,
                    origSize: a.size || a.fileSize,
                    loaded: 0,
                    percent: 0,
                    status: h.QUEUED,
                    lastModifiedDate: a.lastModifiedDate || (new Date).toLocaleString(),
                    getNative: function () {
                        var a = this.getSource().getSource();
                        return -1 !== c.inArray(c.typeOf(a), ["blob", "file"]) ? a : null
                    }, getSource: function () {
                        return b[this.id] ? b[this.id] : null
                    }, destroy: function () {
                        var a = this.getSource();
                        a && (a.destroy(), delete b[this.id])
                    }
                }), b[this.id] = a
            }
            var b = {};
            return a
        }(), h.QueueProgress = function () {
            var a = this;
            a.size = 0, a.loaded = 0, a.uploaded = 0, a.failed = 0, a.queued = 0, a.percent = 0, a.bytesPerSec = 0, a.reset = function () {
                a.size = a.loaded = a.uploaded = a.failed = a.queued = a.percent = a.bytesPerSec = 0
            }
        }, b.plupload = h
    }(window, d), c.exports = window.plupload
}), define("jquery-plugin/plupload-queue/2.0.0/moxie", [], function (a, b, c) {
    ! function (a, b) {
        "use strict";

        function c(a, b) {
            for (var c, d = [], f = 0; f < a.length; ++f) {
                if (c = g[a[f]] || e(a[f]), !c) throw "module definition dependecy not found: " + a[f];
                d.push(c)
            }
            b.apply(null, d)
        }

        function d(a, d, e) {
            if ("string" != typeof a) throw "invalid module definition, module id must be defined and be a string";
            if (d === b) throw "invalid module definition, dependencies must be specified";
            if (e === b) throw "invalid module definition, definition function must be specified";
            c(d, function () {
                g[a] = e.apply(null, arguments)
            })
        }

        function e(b) {
            for (var c = a, d = b.split(/[.\/]/), e = 0; e < d.length; ++e) {
                if (!c[d[e]]) return;
                c = c[d[e]]
            }
            return c
        }

        function f(c) {
            for (var d = 0; d < c.length; d++) {
                for (var e = a, f = c[d], h = f.split(/[.\/]/), i = 0; i < h.length - 1; ++i) e[h[i]] === b && (e[h[i]] = {}), e = e[h[i]];
                e[h[h.length - 1]] = g[f]
            }
        }
        var g = {};
        d("moxie/core/utils/Basic", [], function () {
            var a = function (a) {
                    var b;
                    return a === b ? "undefined" : null === a ? "null" : a.nodeType ? "node" : {}.toString.call(a).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()
                },
                b = function (d) {
                    var e;
                    return c(arguments, function (g, h) {
                        h > 0 && c(g, function (c, g) {
                            c !== e && (a(d[g]) === a(c) && ~f(a(c), ["array", "object"]) ? b(d[g], c) : d[g] = c)
                        })
                    }), d
                },
                c = function (a, b) {
                    var c, d, e, f;
                    if (a) {
                        try {
                            c = a.length
                        } catch (g) {
                            c = f
                        }
                        if (c === f) {
                            for (d in a)
                                if (a.hasOwnProperty(d) && b(a[d], d) === !1) return
                        } else
                            for (e = 0; c > e; e++)
                                if (b(a[e], e) === !1) return
                    }
                },
                d = function (b) {
                    var c;
                    if (!b || "object" !== a(b)) return !0;
                    for (c in b) return !1;
                    return !0
                },
                e = function (b, c) {
                    function d(e) {
                        "function" === a(b[e]) && b[e](function (a) {
                            ++e < f && !a ? d(e) : c(a)
                        })
                    }
                    var e = 0,
                        f = b.length;
                    "function" !== a(c) && (c = function () {}), b && b.length || c(), d(e)
                },
                f = function (a, b) {
                    if (b) {
                        if (Array.prototype.indexOf) return Array.prototype.indexOf.call(b, a);
                        for (var c = 0, d = b.length; d > c; c++)
                            if (b[c] === a) return c
                    }
                    return -1
                },
                g = function (b, c) {
                    var d = [];
                    "array" !== a(b) && (b = [b]), "array" !== a(c) && (c = [c]);
                    for (var e in b) - 1 === f(b[e], c) && d.push(b[e]);
                    return d.length ? d : !1
                },
                h = function (a, b) {
                    var d = [];
                    return c(a, function (a) {
                        -1 !== f(a, b) && d.push(a)
                    }), d.length ? d : null
                },
                i = function (a) {
                    var b, c = [];
                    for (b = 0; b < a.length; b++) c[b] = a[b];
                    return c
                },
                j = function () {
                    var a = 0;
                    return function (b) {
                        var c, d = (new Date).getTime().toString(32);
                        for (c = 0; 5 > c; c++) d += Math.floor(65535 * Math.random()).toString(32);
                        return (b || "o_") + d + (a++).toString(32)
                    }
                }(),
                k = function (a) {
                    return a ? String.prototype.trim ? String.prototype.trim.call(a) : a.toString().replace(/^\s*/, "").replace(/\s*$/, "") : a
                },
                l = function (a) {
                    if ("string" != typeof a) return a;
                    var b, c = {
                        t: 1099511627776,
                        g: 1073741824,
                        m: 1048576,
                        k: 1024
                    };
                    return a = /^([0-9]+)([mgk]?)$/.exec(a.toLowerCase().replace(/[^0-9mkg]/g, "")), b = a[2], a = +a[1], c.hasOwnProperty(b) && (a *= c[b]), a
                };
            return {
                guid: j,
                typeOf: a,
                extend: b,
                each: c,
                isEmptyObj: d,
                inSeries: e,
                inArray: f,
                arrayDiff: g,
                arrayIntersect: h,
                toArray: i,
                trim: k,
                parseSizeStr: l
            }
        }), d("moxie/core/I18n", ["moxie/core/utils/Basic"], function (a) {
            var b = {};
            return {
                addI18n: function (c) {
                    return a.extend(b, c)
                }, translate: function (a) {
                    return b[a] || a
                }, _: function (a) {
                    return this.translate(a)
                }, sprintf: function (b) {
                    var c = [].slice.call(arguments, 1),
                        d = "";
                    return a.each(b.split(/%[a-z]/), function (a) {
                        d += a, c.length && (d += c.shift())
                    }), d
                }
            }
        }), d("moxie/core/utils/Mime", ["moxie/core/utils/Basic", "moxie/core/I18n"], function (a, b) {
            var c = "application/msword,doc dot,application/pdf,pdf,application/pgp-signature,pgp,application/postscript,ps ai eps,application/rtf,rtf,application/vnd.ms-excel,xls xlb,application/vnd.ms-powerpoint,ppt pps pot,application/zip,zip,application/x-shockwave-flash,swf swfl,application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx,application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx,application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx,application/vnd.openxmlformats-officedocument.presentationml.template,potx,application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx,application/x-javascript,js,application/json,json,audio/mpeg,mp3 mpga mpega mp2,audio/x-wav,wav,audio/mp4,m4a,audio/ogg,oga ogg,audio/aiff,aiff aif,audio/flac,flac,audio/aac,aac,audio/ac3,ac3,audio/x-ms-wma,wma,image/bmp,bmp,image/gif,gif,image/jpeg,jpg jpeg jpe,image/photoshop,psd,image/png,png,image/svg+xml,svg svgz,image/tiff,tiff tif,text/plain,asc txt text diff log,text/html,htm html xhtml,text/css,css,text/csv,csv,text/rtf,rtf,video/mpeg,mpeg mpg mpe m2v,video/quicktime,qt mov,video/mp4,mp4,video/x-m4v,m4v,video/x-flv,flv,video/x-ms-wmv,wmv,video/avi,avi,video/webm,webm,video/3gpp,3gpp 3gp,video/3gpp2,3g2,video/vnd.rn-realvideo,rv,video/ogg,ogv,video/x-matroska,mkv,application/vnd.oasis.opendocument.formula-template,otf,application/octet-stream,exe",
                d = {
                    mimes: {},
                    extensions: {},
                    addMimeType: function (a) {
                        var b, c, d, e = a.split(/,/);
                        for (b = 0; b < e.length; b += 2) {
                            for (d = e[b + 1].split(/ /), c = 0; c < d.length; c++) this.mimes[d[c]] = e[b];
                            this.extensions[e[b]] = d
                        }
                    }, extList2mimes: function (b, c) {
                        var d, e, f, g, h = this,
                            i = [];
                        for (e = 0; e < b.length; e++)
                            for (d = b[e].extensions.split(/\s*,\s*/), f = 0; f < d.length; f++) {
                                if ("*" === d[f]) return [];
                                if (g = h.mimes[d[f]]) - 1 === a.inArray(g, i) && i.push(g);
                                else {
                                    if (!c || !/^\w+$/.test(d[f])) return [];
                                    i.push("." + d[f])
                                }
                            }
                        return i
                    }, mimes2exts: function (b) {
                        var c = this,
                            d = [];
                        return a.each(b, function (b) {
                            if ("*" === b) return d = [], !1;
                            var e = b.match(/^(\w+)\/(\*|\w+)$/);
                            e && ("*" === e[2] ? a.each(c.extensions, function (a, b) {
                                new RegExp("^" + e[1] + "/").test(b) && [].push.apply(d, c.extensions[b])
                            }) : c.extensions[b] && [].push.apply(d, c.extensions[b]))
                        }), d
                    }, mimes2extList: function (c) {
                        var d = [],
                            e = [];
                        return "string" === a.typeOf(c) && (c = a.trim(c).split(/\s*,\s*/)), e = this.mimes2exts(c), d.push({
                            title: b.translate("Files"),
                            extensions: e.length ? e.join(",") : "*"
                        }), d.mimes = c, d
                    }, getFileExtension: function (a) {
                        var b = a && a.match(/\.([^.]+)$/);
                        return b ? b[1].toLowerCase() : ""
                    }, getFileMime: function (a) {
                        return this.mimes[this.getFileExtension(a)] || ""
                    }
                };
            return d.addMimeType(c), d
        }), d("moxie/core/utils/Env", ["moxie/core/utils/Basic"], function (a) {
            function b(a) {
                for (var b, c, e = 0; e < a.length; e++)
                    if (b = a[e].s1, c = a[e].prop, d = a[e].sv || a[e].id, b) {
                        if (-1 != b.indexOf(a[e].s2)) return a[e].id
                    } else if (c) return a[e].id
            }

            function c(a) {
                var b = a.indexOf(d);
                if (-1 != b) return parseFloat(a.substring(b + d.length + 1))
            }
            var d, e = [{
                    s1: navigator.userAgent,
                    s2: "Android",
                    id: "Android Browser",
                    sv: "Version"
                }, {
                    s1: navigator.userAgent,
                    s2: "Chrome",
                    id: "Chrome"
                }, {
                    s1: navigator.vendor,
                    s2: "Apple",
                    id: "Safari",
                    sv: "Version"
                }, {
                    prop: window.opera && window.opera.buildNumber,
                    id: "Opera",
                    sv: "Version"
                }, {
                    s1: navigator.vendor,
                    s2: "KDE",
                    id: "Konqueror"
                }, {
                    s1: navigator.userAgent,
                    s2: "Firefox",
                    id: "Firefox"
                }, {
                    s1: navigator.vendor,
                    s2: "Camino",
                    id: "Camino"
                }, {
                    s1: navigator.userAgent,
                    s2: "Netscape",
                    id: "Netscape"
                }, {
                    s1: navigator.userAgent,
                    s2: "MSIE",
                    id: "IE",
                    sv: "MSIE"
                }, {
                    s1: navigator.userAgent,
                    s2: "Gecko",
                    id: "Mozilla",
                    sv: "rv"
                }],
                f = [{
                    s1: navigator.platform,
                    s2: "Win",
                    id: "Windows"
                }, {
                    s1: navigator.platform,
                    s2: "Mac",
                    id: "Mac"
                }, {
                    s1: navigator.userAgent,
                    s2: "iPhone",
                    id: "iOS"
                }, {
                    s1: navigator.userAgent,
                    s2: "iPad",
                    id: "iOS"
                }, {
                    s1: navigator.userAgent,
                    s2: "Android",
                    id: "Android"
                }, {
                    s1: navigator.platform,
                    s2: "Linux",
                    id: "Linux"
                }],
                g = function () {
                    var b = {
                        define_property: function () {
                            return !1
                        }(),
                        create_canvas: function () {
                            var a = document.createElement("canvas");
                            return !(!a.getContext || !a.getContext("2d"))
                        }(),
                        return_response_type: function (b) {
                            try {
                                if (-1 !== a.inArray(b, ["", "text", "document"])) return !0;
                                if (window.XMLHttpRequest) {
                                    var c = new XMLHttpRequest;
                                    if (c.open("get", "/"), "responseType" in c) return c.responseType = b, c.responseType !== b ? !1 : !0
                                }
                            } catch (d) {}
                            return !1
                        }, use_data_uri: function () {
                            var a = new Image;
                            return a.onload = function () {
                                b.use_data_uri = 1 === a.width && 1 === a.height
                            }, setTimeout(function () {
                                a.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP8AAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                            }, 1), !1
                        }(),
                        use_data_uri_over32kb: function () {
                            return b.use_data_uri && ("IE" !== h.browser || h.version >= 9)
                        }, use_data_uri_of: function (a) {
                            return b.use_data_uri && 33e3 > a || b.use_data_uri_over32kb()
                        }, use_fileinput: function () {
                            var a = document.createElement("input");
                            return a.setAttribute("type", "file"), !a.disabled
                        }
                    };
                    return function (c) {
                        var d = [].slice.call(arguments);
                        return d.shift(), "function" === a.typeOf(b[c]) ? b[c].apply(this, d) : !!b[c]
                    }
                }(),
                h = {
                    can: g,
                    browser: b(e),
                    version: c(navigator.userAgent) || c(navigator.appVersion),
                    OS: b(f),
                    swf_url: "../flash/Moxie.swf",
                    xap_url: "../silverlight/Moxie.xap",
                    global_event_dispatcher: "moxie.core.EventTarget.instance.dispatchEvent"
                };
            return h
        }), d("moxie/core/utils/Dom", ["moxie/core/utils/Env"], function (a) {
            var b = function (a) {
                    return "string" != typeof a ? a : document.getElementById(a)
                },
                c = function (a, b) {
                    var c;
                    return "" === a.className ? !1 : (c = new RegExp("(^|\\s+)" + b + "(\\s+|$)"), c.test(a.className))
                },
                d = function (a, b) {
                    c(a, b) || (a.className = "" === a.className ? b : a.className.replace(/\s+$/, "") + " " + b)
                },
                e = function (a, b) {
                    var c = new RegExp("(^|\\s+)" + b + "(\\s+|$)");
                    a.className = a.className.replace(c, function (a, b, c) {
                        return " " === b && " " === c ? " " : ""
                    })
                },
                f = function (a, b) {
                    return a.currentStyle ? a.currentStyle[b] : window.getComputedStyle ? window.getComputedStyle(a, null)[b] : void 0
                },
                g = function (b, c) {
                    function d(a) {
                        var b, c, d = 0,
                            e = 0;
                        return a && (c = a.getBoundingClientRect(), b = "CSS1Compat" === j.compatMode ? j.documentElement : j.body, d = c.left + b.scrollLeft, e = c.top + b.scrollTop), {
                            x: d,
                            y: e
                        }
                    }
                    var e, f, g, h = 0,
                        i = 0,
                        j = document;
                    if (b = b, c = c || j.body, b && b.getBoundingClientRect && "IE" === a.browser && (!j.documentMode || j.documentMode < 8)) return f = d(b), g = d(c), {
                        x: f.x - g.x,
                        y: f.y - g.y
                    };
                    for (e = b; e && e != c && e.nodeType;) h += e.offsetLeft || 0, i += e.offsetTop || 0, e = e.offsetParent;
                    for (e = b.parentNode; e && e != c && e.nodeType;) h -= e.scrollLeft || 0, i -= e.scrollTop || 0, e = e.parentNode;
                    return {
                        x: h,
                        y: i
                    }
                },
                h = function (a) {
                    return {
                        w: a.offsetWidth || a.clientWidth,
                        h: a.offsetHeight || a.clientHeight
                    }
                };
            return {
                get: b,
                hasClass: c,
                addClass: d,
                removeClass: e,
                getStyle: f,
                getPos: g,
                getSize: h
            }
        }), d("moxie/core/Exceptions", ["moxie/core/utils/Basic"], function (a) {
            function b(a, b) {
                var c;
                for (c in a)
                    if (a[c] === b) return c;
                return null
            }
            return {
                RuntimeError: function () {
                    function c(a) {
                        this.code = a, this.name = b(d, a), this.message = this.name + ": RuntimeError " + this.code
                    }
                    var d = {
                        NOT_INIT_ERR: 1,
                        NOT_SUPPORTED_ERR: 9,
                        JS_ERR: 4
                    };
                    return a.extend(c, d), c.prototype = Error.prototype, c
                }(),
                OperationNotAllowedException: function () {
                    function b(a) {
                        this.code = a, this.name = "OperationNotAllowedException"
                    }
                    return a.extend(b, {
                        NOT_ALLOWED_ERR: 1
                    }), b.prototype = Error.prototype, b
                }(),
                ImageError: function () {
                    function c(a) {
                        this.code = a, this.name = b(d, a), this.message = this.name + ": ImageError " + this.code
                    }
                    var d = {
                        WRONG_FORMAT: 1,
                        MAX_RESOLUTION_ERR: 2
                    };
                    return a.extend(c, d), c.prototype = Error.prototype, c
                }(),
                FileException: function () {
                    function c(a) {
                        this.code = a, this.name = b(d, a), this.message = this.name + ": FileException " + this.code
                    }
                    var d = {
                        NOT_FOUND_ERR: 1,
                        SECURITY_ERR: 2,
                        ABORT_ERR: 3,
                        NOT_READABLE_ERR: 4,
                        ENCODING_ERR: 5,
                        NO_MODIFICATION_ALLOWED_ERR: 6,
                        INVALID_STATE_ERR: 7,
                        SYNTAX_ERR: 8
                    };
                    return a.extend(c, d), c.prototype = Error.prototype, c
                }(),
                DOMException: function () {
                    function c(a) {
                        this.code = a, this.name = b(d, a), this.message = this.name + ": DOMException " + this.code
                    }
                    var d = {
                        INDEX_SIZE_ERR: 1,
                        DOMSTRING_SIZE_ERR: 2,
                        HIERARCHY_REQUEST_ERR: 3,
                        WRONG_DOCUMENT_ERR: 4,
                        INVALID_CHARACTER_ERR: 5,
                        NO_DATA_ALLOWED_ERR: 6,
                        NO_MODIFICATION_ALLOWED_ERR: 7,
                        NOT_FOUND_ERR: 8,
                        NOT_SUPPORTED_ERR: 9,
                        INUSE_ATTRIBUTE_ERR: 10,
                        INVALID_STATE_ERR: 11,
                        SYNTAX_ERR: 12,
                        INVALID_MODIFICATION_ERR: 13,
                        NAMESPACE_ERR: 14,
                        INVALID_ACCESS_ERR: 15,
                        VALIDATION_ERR: 16,
                        TYPE_MISMATCH_ERR: 17,
                        SECURITY_ERR: 18,
                        NETWORK_ERR: 19,
                        ABORT_ERR: 20,
                        URL_MISMATCH_ERR: 21,
                        QUOTA_EXCEEDED_ERR: 22,
                        TIMEOUT_ERR: 23,
                        INVALID_NODE_TYPE_ERR: 24,
                        DATA_CLONE_ERR: 25
                    };
                    return a.extend(c, d), c.prototype = Error.prototype, c
                }(),
                EventException: function () {
                    function b(a) {
                        this.code = a, this.name = "EventException"
                    }
                    return a.extend(b, {
                        UNSPECIFIED_EVENT_TYPE_ERR: 0
                    }), b.prototype = Error.prototype, b
                }()
            }
        }), d("moxie/core/EventTarget", ["moxie/core/Exceptions", "moxie/core/utils/Basic"], function (a, b) {
            function c() {
                var c = {};
                b.extend(this, {
                    uid: null,
                    init: function () {
                        this.uid || (this.uid = b.guid("uid_"))
                    }, addEventListener: function (a, d, e, f) {
                        var g, h = this;
                        return a = b.trim(a), /\s/.test(a) ? (b.each(a.split(/\s+/), function (a) {
                            h.addEventListener(a, d, e, f)
                        }), void 0) : (a = a.toLowerCase(), e = parseInt(e, 10) || 0, g = c[this.uid] && c[this.uid][a] || [], g.push({
                            fn: d,
                            priority: e,
                            scope: f || this
                        }), c[this.uid] || (c[this.uid] = {}), c[this.uid][a] = g, void 0)
                    }, hasEventListener: function (a) {
                        return a ? !(!c[this.uid] || !c[this.uid][a]) : !!c[this.uid]
                    }, removeEventListener: function (a, d) {
                        a = a.toLowerCase();
                        var e, f = c[this.uid] && c[this.uid][a];
                        if (f) {
                            if (d) {
                                for (e = f.length - 1; e >= 0; e--)
                                    if (f[e].fn === d) {
                                        f.splice(e, 1);
                                        break
                                    }
                            } else f = [];
                            f.length || (delete c[this.uid][a], b.isEmptyObj(c[this.uid]) && delete c[this.uid])
                        }
                    }, removeAllEventListeners: function () {
                        c[this.uid] && delete c[this.uid]
                    }, dispatchEvent: function (d) {
                        var e, f, g, h, i = {};
                        if ("string" !== b.typeOf(d)) {
                            if (h = d, "string" !== b.typeOf(h.type)) throw new a.EventException(a.EventException.UNSPECIFIED_EVENT_TYPE_ERR);
                            d = h.type, h.total && h.loaded && (i.total = h.total, i.loaded = h.loaded), i.async = h.async || !1
                        }
                        if (-1 !== d.indexOf("::") ? ! function (a) {
                            e = a[0], d = a[1]
                        }(d.split("::")) : e = this.uid, d = d.toLowerCase(), f = c[e] && c[e][d]) {
                            f.sort(function (a, b) {
                                return b.priority - a.priority
                            }), g = [].slice.call(arguments), g.shift(), i.type = d, g.unshift(i);
                            var j = [];
                            b.each(f, function (a) {
                                g[0].target = a.scope, i.async ? j.push(function (b) {
                                    setTimeout(function () {
                                        b(a.fn.apply(a.scope, g) === !1)
                                    }, 1)
                                }) : j.push(function (b) {
                                    b(a.fn.apply(a.scope, g) === !1)
                                })
                            }), j.length && b.inSeries(j)
                        }
                        return !0
                    }, bind: function () {
                        this.addEventListener.apply(this, arguments)
                    }, unbind: function () {
                        this.removeEventListener.apply(this, arguments)
                    }, unbindAll: function () {
                        this.removeAllEventListeners.apply(this, arguments)
                    }, trigger: function () {
                        this.dispatchEvent.apply(this, arguments)
                    }, convertEventPropsToHandlers: function (a) {
                        var c;
                        "array" !== b.typeOf(a) && (a = [a]);
                        for (var d = 0; d < a.length; d++) c = "on" + a[d], "function" === b.typeOf(this[c]) ? this.addEventListener(a[d], this[c]) : "undefined" === b.typeOf(this[c]) && (this[c] = null)
                    }
                })
            }
            return c.instance = new c, c
        }), d("moxie/core/utils/Encode", [], function () {
            var a = function (a) {
                    return unescape(encodeURIComponent(a))
                },
                b = function (a) {
                    return decodeURIComponent(escape(a))
                },
                c = function (a, c) {
                    if ("function" == typeof window.atob) return c ? b(window.atob(a)) : window.atob(a);
                    var d, e, f, g, h, i, j, k, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                        m = 0,
                        n = 0,
                        o = "",
                        p = [];
                    if (!a) return a;
                    a += "";
                    do g = l.indexOf(a.charAt(m++)), h = l.indexOf(a.charAt(m++)), i = l.indexOf(a.charAt(m++)), j = l.indexOf(a.charAt(m++)), k = g << 18 | h << 12 | i << 6 | j, d = 255 & k >> 16, e = 255 & k >> 8, f = 255 & k, p[n++] = 64 == i ? String.fromCharCode(d) : 64 == j ? String.fromCharCode(d, e) : String.fromCharCode(d, e, f); while (m < a.length);
                    return o = p.join(""), c ? b(o) : o
                },
                d = function (b, c) {
                    if (c && a(b), "function" == typeof window.btoa) return window.btoa(b);
                    var d, e, f, g, h, i, j, k, l = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                        m = 0,
                        n = 0,
                        o = "",
                        p = [];
                    if (!b) return b;
                    do d = b.charCodeAt(m++), e = b.charCodeAt(m++), f = b.charCodeAt(m++), k = d << 16 | e << 8 | f, g = 63 & k >> 18, h = 63 & k >> 12, i = 63 & k >> 6, j = 63 & k, p[n++] = l.charAt(g) + l.charAt(h) + l.charAt(i) + l.charAt(j); while (m < b.length);
                    o = p.join("");
                    var q = b.length % 3;
                    return (q ? o.slice(0, q - 3) : o) + "===".slice(q || 3)
                };
            return {
                utf8_encode: a,
                utf8_decode: b,
                atob: c,
                btoa: d
            }
        }), d("moxie/runtime/Runtime", ["moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/EventTarget"], function (a, b, c) {
            function d(c, e, g, h, i) {
                function j(b, d) {
                    var e = null,
                        f = c && c.required_caps;
                    return d = d || "browser", null !== this.mode ? this.mode : (f && !a.isEmptyObj(b) && (a.each(f, function (c, d) {
                        if (b.hasOwnProperty(d)) {
                            var f = b[d](c);
                            if ("string" == typeof f && (f = [f]), e) {
                                if (!(e = a.arrayIntersect(e, f))) return e = !1
                            } else e = f
                        }
                    }), e ? this.mode = -1 !== a.inArray(d, e) ? d : e[0] : e === !1 && (this.mode = !1)), null === this.mode && (this.mode = d), this.mode && f && !this.can(f) && (this.mode = !1), void 0)
                }
                var k, l = this,
                    m = a.guid(e + "_");
                f[m] = this, g = a.extend({
                    access_binary: !1,
                    access_image_binary: !1,
                    display_media: !1,
                    do_cors: !1,
                    drag_and_drop: !1,
                    filter_by_extension: !0,
                    resize_image: !1,
                    report_upload_progress: !1,
                    return_response_headers: !1,
                    return_response_type: !1,
                    return_status_code: !0,
                    send_custom_headers: !1,
                    select_file: !1,
                    select_folder: !1,
                    select_multiple: !0,
                    send_binary_string: !1,
                    send_browser_cookies: !0,
                    send_multipart: !0,
                    slice_blob: !1,
                    stream_upload: !1,
                    summon_file_dialog: !1,
                    upload_filesize: !0,
                    use_http_method: !0
                }, g), k = function () {
                    var b = {};
                    return {
                        exec: function (a, c, d, e) {
                            return k[c] && (b[a] || (b[a] = {
                                context: this,
                                instance: new k[c]
                            }), b[a].instance[d]) ? b[a].instance[d].apply(this, e) : void 0
                        }, removeInstance: function (a) {
                            delete b[a]
                        }, removeAllInstances: function () {
                            var c = this;
                            a.each(b, function (b, d) {
                                "function" === a.typeOf(b.instance.destroy) && b.instance.destroy.call(b.context), c.removeInstance(d)
                            })
                        }
                    }
                }(), a.extend(this, {
                    initialized: !1,
                    uid: m,
                    type: e,
                    mode: null,
                    shimid: m + "_container",
                    clients: 0,
                    options: c,
                    can: function (b, c) {
                        var e = arguments[2] || g;
                        if ("string" === a.typeOf(b) && "undefined" === a.typeOf(c) && (b = d.parseCaps(b)), "object" === a.typeOf(b)) {
                            for (var f in b)
                                if (!this.can(f, b[f], e)) return !1;
                            return !0
                        }
                        return "function" === a.typeOf(e[b]) ? e[b].call(this, c) : c === e[b]
                    }, getShimContainer: function () {
                        var c, d = b.get(this.shimid);
                        return d || (c = this.options.container ? b.get(this.options.container) : document.body, d = document.createElement("div"), d.id = this.shimid, d.className = "moxie-shim moxie-shim-" + this.type, a.extend(d.style, {
                            position: "absolute",
                            top: "0px",
                            left: "0px",
                            width: "1px",
                            height: "1px",
                            overflow: "hidden"
                        }), c.appendChild(d), c = null), d
                    }, getShim: function () {
                        return k
                    }, shimExec: function (a, b) {
                        var c = [].slice.call(arguments, 2);
                        return l.getShim().exec.call(this, this.uid, a, b, c)
                    }, exec: function (a, b) {
                        var c = [].slice.call(arguments, 2);
                        return l[a] && l[a][b] ? l[a][b].apply(this, c) : l.shimExec.apply(this, arguments)
                    }, destroy: function () {
                        if (l) {
                            var a = b.get(this.shimid);
                            a && a.parentNode.removeChild(a), k && k.removeAllInstances(), this.unbindAll(), delete f[this.uid], this.uid = null, m = l = k = a = null
                        }
                    }
                }), j.call(this, h, i)
            }
            var e = {},
                f = {};
            return d.order = "html5,flash,silverlight,html4", d.getRuntime = function (a) {
                return f[a] ? f[a] : !1
            }, d.addConstructor = function (a, b) {
                b.prototype = c.instance, e[a] = b
            }, d.getConstructor = function (a) {
                return e[a] || null
            }, d.getInfo = function (a) {
                var b = d.getRuntime(a);
                return b ? {
                    uid: b.uid,
                    type: b.type,
                    can: function () {
                        return b.can.apply(b, arguments)
                    }
                } : null
            }, d.parseCaps = function (b) {
                var c = {};
                return "string" !== a.typeOf(b) ? b || {} : (a.each(b.split(","), function (a) {
                    c[a] = !0
                }), c)
            }, d.can = function (a, b) {
                var c, e, f = d.getConstructor(a);
                return f ? (c = new f({
                    required_caps: b
                }), e = c.mode, c.destroy(), !!e) : !1
            }, d.thatCan = function (a, b) {
                var c = (b || d.order).split(/\s*,\s*/);
                for (var e in c)
                    if (d.can(c[e], a)) return c[e];
                return null
            }, d.capTrue = function () {
                return !0
            }, d.capFalse = function () {
                return !1
            }, d.capTest = function (a) {
                return function () {
                    return !!a
                }
            }, d
        }), d("moxie/runtime/RuntimeClient", ["moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/runtime/Runtime"], function (a, b, c) {
            return function () {
                var d;
                b.extend(this, {
                    connectRuntime: function (e) {
                        function f(b) {
                            var g, i;
                            return b.length ? (g = b.shift(), (i = c.getConstructor(g)) ? (d = new i(e), d.bind("Init", function () {
                                d.initialized = !0, setTimeout(function () {
                                    d.clients++, h.trigger("RuntimeInit", d)
                                }, 1)
                            }), d.bind("Error", function () {
                                d.destroy(), f(b)
                            }), d.mode ? (d.init(), void 0) : (d.trigger("Error"), void 0)) : (f(b), void 0)) : (h.trigger("RuntimeError", new a.RuntimeError(a.RuntimeError.NOT_INIT_ERR)), d = null, void 0)
                        }
                        var g, h = this;
                        if ("string" === b.typeOf(e) ? g = e : "string" === b.typeOf(e.ruid) && (g = e.ruid), g) {
                            if (d = c.getRuntime(g)) return d.clients++, d;
                            throw new a.RuntimeError(a.RuntimeError.NOT_INIT_ERR)
                        }
                        f((e.runtime_order || c.order).split(/\s*,\s*/))
                    }, getRuntime: function () {
                        return d && d.uid ? d : (d = null, null)
                    }, disconnectRuntime: function () {
                        d && --d.clients <= 0 && (d.destroy(), d = null)
                    }
                })
            }
        }), d("moxie/file/Blob", ["moxie/core/utils/Basic", "moxie/core/utils/Encode", "moxie/runtime/RuntimeClient"], function (a, b, c) {
            function d(f, g) {
                function h(b, c, f) {
                    var g, h = e[this.uid];
                    return "string" === a.typeOf(h) && h.length ? (g = new d(null, {
                        type: f,
                        size: c - b
                    }), g.detach(h.substr(b, g.size)), g) : null
                }
                c.call(this), f && this.connectRuntime(f), g ? "string" === a.typeOf(g) && (g = {
                    data: g
                }) : g = {}, a.extend(this, {
                    uid: g.uid || a.guid("uid_"),
                    ruid: f,
                    size: g.size || 0,
                    type: g.type || "",
                    slice: function (a, b, c) {
                        return this.isDetached() ? h.apply(this, arguments) : this.getRuntime().exec.call(this, "Blob", "slice", this.getSource(), a, b, c)
                    }, getSource: function () {
                        return e[this.uid] ? e[this.uid] : null
                    }, detach: function (a) {
                        this.ruid && (this.getRuntime().exec.call(this, "Blob", "destroy", e[this.uid]), this.disconnectRuntime(), this.ruid = null), a = a || "";
                        var c = a.match(/^data:([^;]*);base64,/);
                        c && (this.type = c[1], a = b.atob(a.substring(a.indexOf("base64,") + 7))), this.size = a.length, e[this.uid] = a
                    }, isDetached: function () {
                        return !this.ruid && "string" === a.typeOf(e[this.uid])
                    }, destroy: function () {
                        this.detach(), delete e[this.uid]
                    }
                }), g.data ? this.detach(g.data) : e[this.uid] = g
            }
            var e = {};
            return d
        }), d("moxie/file/File", ["moxie/core/utils/Basic", "moxie/core/utils/Mime", "moxie/file/Blob"], function (a, b, c) {
            function d(d, e) {
                var f, g;
                if (e || (e = {}), g = e.type && "" !== e.type ? e.type : b.getFileMime(e.name), e.name) f = e.name.replace(/\\/g, "/"), f = f.substr(f.lastIndexOf("/") + 1);
                else {
                    var h = g.split("/")[0];
                    f = a.guid(("" !== h ? h : "file") + "_"), b.extensions[g] && (f += "." + b.extensions[g][0])
                }
                c.apply(this, arguments), a.extend(this, {
                    type: g || "",
                    name: f || a.guid("file_"),
                    lastModifiedDate: e.lastModifiedDate || (new Date).toLocaleString()
                })
            }
            return d.prototype = c.prototype, d
        }), d("moxie/file/FileInput", ["moxie/core/utils/Basic", "moxie/core/utils/Mime", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/core/I18n", "moxie/file/File", "moxie/runtime/Runtime", "moxie/runtime/RuntimeClient"], function (a, b, c, d, e, f, g, h, i) {
            function j(e) {
                var j, l, m, n = this;
                if (-1 !== a.inArray(a.typeOf(e), ["string", "node"]) && (e = {
                    browse_button: e
                }), l = c.get(e.browse_button), !l) throw new d.DOMException(d.DOMException.NOT_FOUND_ERR);
                m = {
                    accept: [{
                        title: f.translate("All Files"),
                        extensions: "*"
                    }],
                    name: "file",
                    multiple: !1,
                    required_caps: !1,
                    container: l.parentNode || document.body
                }, e = a.extend({}, m, e), "string" == typeof e.required_caps && (e.required_caps = h.parseCaps(e.required_caps)), "string" == typeof e.accept && (e.accept = b.mimes2extList(e.accept)), j = c.get(e.container), j || (j = document.body), "static" === c.getStyle(j, "position") && (j.style.position = "relative"), j = l = null, i.call(n), a.extend(n, {
                    uid: a.guid("uid_"),
                    ruid: null,
                    files: null,
                    init: function () {
                        n.convertEventPropsToHandlers(k), n.bind("RuntimeInit", function (b, d) {
                            n.ruid = d.uid, n.bind("Ready", function () {
                                n.trigger("Refresh")
                            }, 999), n.bind("Change", function () {
                                var b = d.exec.call(n, "FileInput", "getFiles");
                                n.files = [], a.each(b, function (a) {
                                    return 0 === a.size ? !0 : (n.files.push(new g(n.ruid, a)), void 0)
                                })
                            }, 999), n.bind("Refresh", function () {
                                var b, f, g, h;
                                g = c.get(e.browse_button), h = c.get(d.shimid), g && (b = c.getPos(g, c.get(e.container)), f = c.getSize(g), h && a.extend(h.style, {
                                    top: b.y + "px",
                                    left: b.x + "px",
                                    width: f.w + "px",
                                    height: f.h + "px"
                                })), h = g = null
                            }), d.exec.call(n, "FileInput", "init", e)
                        }), n.connectRuntime(a.extend({}, e, {
                            required_caps: {
                                select_file: !0
                            }
                        }))
                    }, disable: function (b) {
                        var c = this.getRuntime();
                        c && c.exec.call(this, "FileInput", "disable", "undefined" === a.typeOf(b) ? !0 : b)
                    }, refresh: function () {
                        n.trigger("Refresh")
                    }, destroy: function () {
                        var b = this.getRuntime();
                        b && (b.exec.call(this, "FileInput", "destroy"), this.disconnectRuntime()), "array" === a.typeOf(this.files) && a.each(this.files, function (a) {
                            a.destroy()
                        }), this.files = null
                    }
                })
            }
            var k = ["ready", "change", "cancel", "mouseenter", "mouseleave", "mousedown", "mouseup"];
            return j.prototype = e.instance, j
        }), d("moxie/file/FileDrop", ["moxie/core/I18n", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/file/File", "moxie/runtime/RuntimeClient", "moxie/core/EventTarget", "moxie/core/utils/Mime"], function (a, b, c, d, e, f, g, h) {
            function i(c) {
                var g, i = this;
                "string" == typeof c && (c = {
                    drop_zone: c
                }), g = {
                    accept: [{
                        title: a.translate("All Files"),
                        extensions: "*"
                    }],
                    required_caps: {
                        drag_and_drop: !0
                    }
                }, c = "object" == typeof c ? d.extend({}, g, c) : g, c.container = b.get(c.drop_zone) || document.body, "static" === b.getStyle(c.container, "position") && (c.container.style.position = "relative"), "string" == typeof c.accept && (c.accept = h.mimes2extList(c.accept)), f.call(i), d.extend(i, {
                    uid: d.guid("uid_"),
                    ruid: null,
                    files: null,
                    init: function () {
                        i.convertEventPropsToHandlers(j), i.bind("RuntimeInit", function (a, b) {
                            i.ruid = b.uid, i.bind("Drop", function () {
                                var a = b.exec.call(i, "FileDrop", "getFiles");
                                i.files = [], d.each(a, function (a) {
                                    i.files.push(new e(i.ruid, a))
                                })
                            }, 999), b.exec.call(i, "FileDrop", "init", c), i.dispatchEvent("ready")
                        }), i.connectRuntime(c)
                    }, destroy: function () {
                        var a = this.getRuntime();
                        a && (a.exec.call(this, "FileDrop", "destroy"), this.disconnectRuntime()), this.files = null
                    }
                })
            }
            var j = ["ready", "dragenter", "dragleave", "drop", "error"];
            return i.prototype = g.instance, i
        }), d("moxie/runtime/RuntimeTarget", ["moxie/core/utils/Basic", "moxie/runtime/RuntimeClient", "moxie/core/EventTarget"], function (a, b, c) {
            function d() {
                this.uid = a.guid("uid_"), b.call(this), this.destroy = function () {
                    this.disconnectRuntime(), this.unbindAll()
                }
            }
            return d.prototype = c.instance, d
        }), d("moxie/file/FileReader", ["moxie/core/utils/Basic", "moxie/core/utils/Encode", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/file/Blob", "moxie/file/File", "moxie/runtime/RuntimeTarget"], function (a, b, c, d, e, f, g) {
            function h() {
                function d(a, d) {
                    function k(a) {
                        j.readyState = h.DONE, j.error = a, j.trigger("error"), l()
                    }

                    function l() {
                        f.destroy(), f = null, j.trigger("loadend")
                    }

                    function m(b) {
                        f.bind("Error", function (a, b) {
                            k(b)
                        }), f.bind("Progress", function (a) {
                            j.result = b.exec.call(f, "FileReader", "getResult"), j.trigger(a)
                        }), f.bind("Load", function (a) {
                            j.readyState = h.DONE, j.result = b.exec.call(f, "FileReader", "getResult"), j.trigger(a), l()
                        }), b.exec.call(f, "FileReader", "read", a, d)
                    }
                    if (f = new g, this.convertEventPropsToHandlers(i), this.readyState === h.LOADING) return k(new c.DOMException(c.DOMException.INVALID_STATE_ERR));
                    if (this.readyState = h.LOADING, this.trigger("loadstart"), d instanceof e)
                        if (d.isDetached()) {
                            var n = d.getSource();
                            switch (a) {
                            case "readAsText":
                            case "readAsBinaryString":
                                this.result = n;
                                break;
                            case "readAsDataURL":
                                this.result = "data:" + d.type + ";base64," + b.btoa(n)
                            }
                            this.readyState = h.DONE, this.trigger("load"), l()
                        } else m(f.connectRuntime(d.ruid));
                    else k(new c.DOMException(c.DOMException.NOT_FOUND_ERR))
                }
                var f, j = this;
                a.extend(this, {
                    uid: a.guid("uid_"),
                    readyState: h.EMPTY,
                    result: null,
                    error: null,
                    readAsBinaryString: function (a) {
                        d.call(this, "readAsBinaryString", a)
                    }, readAsDataURL: function (a) {
                        d.call(this, "readAsDataURL", a)
                    }, readAsText: function (a) {
                        d.call(this, "readAsText", a)
                    }, abort: function () {
                        this.result = null, -1 === a.inArray(this.readyState, [h.EMPTY, h.DONE]) && (this.readyState === h.LOADING && (this.readyState = h.DONE), f && f.getRuntime().exec.call(this, "FileReader", "abort"), this.trigger("abort"), this.trigger("loadend"))
                    }, destroy: function () {
                        this.abort(), f && (f.getRuntime().exec.call(this, "FileReader", "destroy"), f.disconnectRuntime()), j = f = null
                    }
                })
            }
            var i = ["loadstart", "progress", "load", "abort", "error", "loadend"];
            return h.EMPTY = 0, h.LOADING = 1, h.DONE = 2, h.prototype = d.instance, h
        }), d("moxie/core/utils/Url", [], function () {
            var a = function (a) {
                    for (var b = ["source", "scheme", "authority", "userInfo", "user", "pass", "host", "port", "relative", "path", "directory", "file", "query", "fragment"], c = b.length, d = {
                        http: 80,
                        https: 443
                    }, e = {}, f = /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\\?([^#]*))?(?:#(.*))?)/, g = f.exec(a || ""); c--;) g[c] && (e[b[c]] = g[c]);
                    if (/^[^\/]/.test(e.path) && !e.scheme) {
                        var h = document.location.pathname;
                        /(\/|\/[^\.]+)$/.test(h) || (h = h.replace(/[^\/]+$/, "")), e.host = document.location.hostname, e.path = h + (e.path || "")
                    }
                    return e.scheme || (e.scheme = document.location.protocol.replace(/:$/, "")), e.host || (e.host = document.location.hostname), e.port || (e.port = document.location.port || d[e.scheme] || 80), e.port = parseInt(e.port, 10), e.path || (e.path = "/"), delete e.source, e
                },
                b = function (b) {
                    var c = {
                            http: 80,
                            https: 443
                        },
                        d = a(b);
                    return d.scheme + "://" + d.host + (d.port !== c[d.scheme] ? ":" + d.port : "") + d.path + (d.query ? d.query : "")
                },
                c = function (b) {
                    function c(a) {
                        return [a.scheme, a.host, a.port].join("/")
                    }
                    return "string" == typeof b && (b = a(b)), c(a()) === c(b)
                };
            return {
                parseUrl: a,
                resolveUrl: b,
                hasSameOrigin: c
            }
        }), d("moxie/file/FileReaderSync", ["moxie/core/utils/Basic", "moxie/runtime/RuntimeClient", "moxie/core/utils/Encode"], function (a, b, c) {
            return function () {
                function d(a, b) {
                    if (!b.isDetached()) {
                        var d = this.connectRuntime(b.ruid).exec.call(this, "FileReaderSync", "read", a, b);
                        return this.disconnectRuntime(), d
                    }
                    var e = b.getSource();
                    switch (a) {
                    case "readAsBinaryString":
                        return e;
                    case "readAsDataURL":
                        return "data:" + b.type + ";base64," + c.btoa(e);
                    case "readAsText":
                        for (var f = "", g = 0, h = e.length; h > g; g++) f += String.fromCharCode(e[g]);
                        return f
                    }
                }
                b.call(this), a.extend(this, {
                    uid: a.guid("uid_"),
                    readAsBinaryString: function (a) {
                        return d.call(this, "readAsBinaryString", a)
                    }, readAsDataURL: function (a) {
                        return d.call(this, "readAsDataURL", a)
                    }, readAsText: function (a) {
                        return d.call(this, "readAsText", a)
                    }
                })
            }
        }), d("moxie/xhr/FormData", ["moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/file/Blob"], function (a, b, c) {
            function d() {
                var a, d = {},
                    e = "";
                b.extend(this, {
                    append: function (e, f) {
                        var g = this,
                            h = b.typeOf(f);
                        f instanceof c ? (a && delete d[a], a = e, d[e] = [f]) : "array" === h ? (e += "[]", b.each(f, function (a) {
                            g.append.call(g, e, a)
                        })) : "object" === h ? b.each(f, function (a, b) {
                            g.append.call(g, e + "[" + b + "]", a)
                        }) : (f = f.toString(), d[e] || (d[e] = []), d[e].push(f))
                    }, hasBlob: function () {
                        return !!a
                    }, getBlob: function () {
                        return d[a] && d[a][0] || null
                    }, getBlobName: function () {
                        return a || null
                    }, each: function (a) {
                        b.each(d, function (c, d) {
                            b.each(c, function (b) {
                                a(b, d)
                            })
                        })
                    }, destroy: function () {
                        a = null, e = "", d = {}
                    }
                })
            }
            return d
        }), d("moxie/xhr/XMLHttpRequest", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/core/utils/Encode", "moxie/core/utils/Url", "moxie/runtime/Runtime", "moxie/runtime/RuntimeTarget", "moxie/file/Blob", "moxie/file/FileReaderSync", "moxie/xhr/FormData", "moxie/core/utils/Env", "moxie/core/utils/Mime"], function (a, b, c, d, e, f, g, h, i, j, k, l) {
            function m() {
                this.uid = a.guid("uid_")
            }

            function n() {
                function c(a, b) {
                    return A.hasOwnProperty(a) ? 1 === arguments.length ? k.can("define_property") ? A[a] : z[a] : (k.can("define_property") ? A[a] = b : z[a] = b, void 0) : void 0
                }

                function i(b) {
                    function d() {
                        x.destroy(), x = null, h.dispatchEvent("loadend"), h = null
                    }

                    function e(e) {
                        x.bind("LoadStart", function (a) {
                            c("readyState", n.LOADING), h.dispatchEvent("readystatechange"), h.dispatchEvent(a), H && h.upload.dispatchEvent(a)
                        }), x.bind("Progress", function (a) {
                            c("readyState") !== n.LOADING && (c("readyState", n.LOADING), h.dispatchEvent("readystatechange")), h.dispatchEvent(a)
                        }), x.bind("UploadProgress", function (a) {
                            H && h.upload.dispatchEvent({
                                type: "progress",
                                lengthComputable: !1,
                                total: a.total,
                                loaded: a.loaded
                            })
                        }), x.bind("Load", function (b) {
                            c("readyState", n.DONE), c("status", Number(e.exec.call(x, "XMLHttpRequest", "getStatus") || 0)), c("statusText", o[c("status")] || ""), c("response", e.exec.call(x, "XMLHttpRequest", "getResponse", c("responseType"))), ~a.inArray(c("responseType"), ["text", ""]) ? c("responseText", c("response")) : "document" === c("responseType") && c("responseXML", c("response")), O = e.exec.call(x, "XMLHttpRequest", "getAllResponseHeaders"), h.dispatchEvent("readystatechange"), c("status") > 0 ? (H && h.upload.dispatchEvent(b), h.dispatchEvent(b)) : (J = !0, h.dispatchEvent("error")), d()
                        }), x.bind("Abort", function (a) {
                            h.dispatchEvent(a), d()
                        }), x.bind("Error", function (a) {
                            J = !0, c("readyState", n.DONE), h.dispatchEvent("readystatechange"), I = !0, h.dispatchEvent(a), d()
                        }), e.exec.call(x, "XMLHttpRequest", "send", {
                            url: r,
                            method: s,
                            async: B,
                            user: t,
                            password: u,
                            headers: C,
                            mimeType: E,
                            encoding: D,
                            responseType: h.responseType,
                            withCredentials: h.withCredentials,
                            options: N
                        }, b)
                    }
                    var h = this;
                    v = (new Date).getTime(), x = new g, "string" == typeof N.required_caps && (N.required_caps = f.parseCaps(N.required_caps)), N.required_caps = a.extend({}, N.required_caps, {
                        return_response_type: h.responseType
                    }), b instanceof j && (N.required_caps.send_multipart = !0), K || (N.required_caps.do_cors = !0), N.ruid ? e(x.connectRuntime(N)) : (x.bind("RuntimeInit", function (a, b) {
                        e(b)
                    }), x.bind("RuntimeError", function (a, b) {
                        h.dispatchEvent("RuntimeError", b)
                    }), x.connectRuntime(N))
                }

                function q() {
                    c("responseText", ""), c("responseXML", null), c("response", null), c("status", 0), c("statusText", ""), v = w = null
                }
                var r, s, t, u, v, w, x, y, z = this,
                    A = {
                        timeout: 0,
                        readyState: n.UNSENT,
                        withCredentials: !1,
                        status: 0,
                        statusText: "",
                        responseType: "",
                        responseXML: null,
                        responseText: null,
                        response: null
                    },
                    B = !0,
                    C = {},
                    D = null,
                    E = null,
                    F = !1,
                    G = !1,
                    H = !1,
                    I = !1,
                    J = !1,
                    K = !1,
                    L = null,
                    M = null,
                    N = {},
                    O = "";
                a.extend(this, A, {
                    uid: a.guid("uid_"),
                    upload: new m,
                    open: function (f, g, h, i, j) {
                        var k;
                        if (!f || !g) throw new b.DOMException(b.DOMException.SYNTAX_ERR);
                        if (/[\u0100-\uffff]/.test(f) || d.utf8_encode(f) !== f) throw new b.DOMException(b.DOMException.SYNTAX_ERR);
                        if (~a.inArray(f.toUpperCase(), ["CONNECT", "DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT", "TRACE", "TRACK"]) && (s = f.toUpperCase()), ~a.inArray(s, ["CONNECT", "TRACE", "TRACK"])) throw new b.DOMException(b.DOMException.SECURITY_ERR);
                        if (g = d.utf8_encode(g), k = e.parseUrl(g), K = e.hasSameOrigin(k), r = e.resolveUrl(g), (i || j) && !K) throw new b.DOMException(b.DOMException.INVALID_ACCESS_ERR);
                        if (t = i || k.user, u = j || k.pass, B = h || !0, B === !1 && (c("timeout") || c("withCredentials") || "" !== c("responseType"))) throw new b.DOMException(b.DOMException.INVALID_ACCESS_ERR);
                        F = !B, G = !1, C = {}, q.call(this), c("readyState", n.OPENED), this.convertEventPropsToHandlers(["readystatechange"]), this.dispatchEvent("readystatechange")
                    }, setRequestHeader: function (e, f) {
                        var g = ["accept-charset", "accept-encoding", "access-control-request-headers", "access-control-request-method", "connection", "content-length", "cookie", "cookie2", "content-transfer-encoding", "date", "expect", "host", "keep-alive", "origin", "referer", "te", "trailer", "transfer-encoding", "upgrade", "user-agent", "via"];
                        if (c("readyState") !== n.OPENED || G) throw new b.DOMException(b.DOMException.INVALID_STATE_ERR);
                        if (/[\u0100-\uffff]/.test(e) || d.utf8_encode(e) !== e) throw new b.DOMException(b.DOMException.SYNTAX_ERR);
                        return e = a.trim(e).toLowerCase(), ~a.inArray(e, g) || /^(proxy\-|sec\-)/.test(e) ? !1 : (C[e] ? C[e] += ", " + f : C[e] = f, !0)
                    }, getAllResponseHeaders: function () {
                        return O || ""
                    }, getResponseHeader: function (b) {
                        return b = b.toLowerCase(), J || ~a.inArray(b, ["set-cookie", "set-cookie2"]) ? null : O && "" !== O && (y || (y = {}, a.each(O.split(/\r\n/), function (b) {
                            var c = b.split(/:\s+/);
                            2 === c.length && (c[0] = a.trim(c[0]), y[c[0].toLowerCase()] = {
                                header: c[0],
                                value: a.trim(c[1])
                            })
                        })), y.hasOwnProperty(b)) ? y[b].header + ": " + y[b].value : null
                    }, overrideMimeType: function (d) {
                        var e, f;
                        if (~a.inArray(c("readyState"), [n.LOADING, n.DONE])) throw new b.DOMException(b.DOMException.INVALID_STATE_ERR);
                        if (d = a.trim(d.toLowerCase()), /;/.test(d) && (e = d.match(/^([^;]+)(?:;\scharset\=)?(.*)$/)) && (d = e[1], e[2] && (f = e[2])), !l.mimes[d]) throw new b.DOMException(b.DOMException.SYNTAX_ERR);
                        L = d, M = f
                    }, send: function (c, e) {
                        if (N = "string" === a.typeOf(e) ? {
                            ruid: e
                        } : e ? e : {}, this.convertEventPropsToHandlers(p), this.upload.convertEventPropsToHandlers(p), this.readyState !== n.OPENED || G) throw new b.DOMException(b.DOMException.INVALID_STATE_ERR);
                        if (c instanceof h) N.ruid = c.ruid, E = c.type || "application/octet-stream";
                        else if (c instanceof j) {
                            if (c.hasBlob()) {
                                var f = c.getBlob();
                                N.ruid = f.ruid, E = f.type || "application/octet-stream"
                            }
                        } else "string" == typeof c && (D = "UTF-8", E = "text/plain;charset=UTF-8", c = d.utf8_encode(c));
                        this.withCredentials || (this.withCredentials = N.required_caps && N.required_caps.send_browser_cookies && !K), H = !F && this.upload.hasEventListener(), J = !1, I = !c, F || (G = !0), i.call(this, c)
                    }, abort: function () {
                        if (J = !0, F = !1, ~a.inArray(c("readyState"), [n.UNSENT, n.OPENED, n.DONE])) c("readyState", n.UNSENT);
                        else {
                            if (c("readyState", n.DONE), G = !1, !x) throw new b.DOMException(b.DOMException.INVALID_STATE_ERR);
                            x.getRuntime().exec.call(x, "XMLHttpRequest", "abort", I), I = !0
                        }
                    }, destroy: function () {
                        x && ("function" === a.typeOf(x.destroy) && x.destroy(), x = null), this.unbindAll(), this.upload && (this.upload.unbindAll(), this.upload = null)
                    }
                })
            }
            var o = {
                100: "Continue",
                101: "Switching Protocols",
                102: "Processing",
                200: "OK",
                201: "Created",
                202: "Accepted",
                203: "Non-Authoritative Information",
                204: "No Content",
                205: "Reset Content",
                206: "Partial Content",
                207: "Multi-Status",
                226: "IM Used",
                300: "Multiple Choices",
                301: "Moved Permanently",
                302: "Found",
                303: "See Other",
                304: "Not Modified",
                305: "Use Proxy",
                306: "Reserved",
                307: "Temporary Redirect",
                400: "Bad Request",
                401: "Unauthorized",
                402: "Payment Required",
                403: "Forbidden",
                404: "Not Found",
                405: "Method Not Allowed",
                406: "Not Acceptable",
                407: "Proxy Authentication Required",
                408: "Request Timeout",
                409: "Conflict",
                410: "Gone",
                411: "Length Required",
                412: "Precondition Failed",
                413: "Request Entity Too Large",
                414: "Request-URI Too Long",
                415: "Unsupported Media Type",
                416: "Requested Range Not Satisfiable",
                417: "Expectation Failed",
                422: "Unprocessable Entity",
                423: "Locked",
                424: "Failed Dependency",
                426: "Upgrade Required",
                500: "Internal Server Error",
                501: "Not Implemented",
                502: "Bad Gateway",
                503: "Service Unavailable",
                504: "Gateway Timeout",
                505: "HTTP Version Not Supported",
                506: "Variant Also Negotiates",
                507: "Insufficient Storage",
                510: "Not Extended"
            };
            m.prototype = c.instance;
            var p = ["loadstart", "progress", "abort", "error", "load", "timeout", "loadend"];
            return n.UNSENT = 0, n.OPENED = 1, n.HEADERS_RECEIVED = 2, n.LOADING = 3, n.DONE = 4, n.prototype = c.instance, n
        }), d("moxie/runtime/Transporter", ["moxie/core/utils/Basic", "moxie/core/utils/Encode", "moxie/runtime/RuntimeClient", "moxie/core/EventTarget"], function (a, b, c, d) {
            function e() {
                function d() {
                    k = l = 0, j = this.result = null
                }

                function f(b, c) {
                    var d = this;
                    i = c, d.bind("TransportingProgress", function (b) {
                        l = b.loaded, k > l && -1 === a.inArray(d.state, [e.IDLE, e.DONE]) && g.call(d)
                    }, 999), d.bind("TransportingComplete", function () {
                        l = k, d.state = e.DONE, j = null, d.result = i.exec.call(d, "Transporter", "getAsBlob", b || "")
                    }, 999), d.state = e.BUSY, d.trigger("TransportingStarted"), g.call(d)
                }

                function g() {
                    var a, c = this,
                        d = k - l;
                    m > d && (m = d), a = b.btoa(j.substr(l, m)), i.exec.call(c, "Transporter", "receive", a, k)
                }
                var h, i, j, k, l, m;
                c.call(this), a.extend(this, {
                    uid: a.guid("uid_"),
                    state: e.IDLE,
                    result: null,
                    transport: function (b, c, e) {
                        var g = this;
                        if (e = a.extend({
                            chunk_size: 204798
                        }, e), (h = e.chunk_size % 3) && (e.chunk_size += 3 - h), m = e.chunk_size, d.call(this), j = b, k = b.length, "string" === a.typeOf(e) || e.ruid) f.call(g, c, this.connectRuntime(e));
                        else {
                            var i = function (a, b) {
                                g.unbind("RuntimeInit", i), f.call(g, c, b)
                            };
                            this.bind("RuntimeInit", i), this.connectRuntime(e)
                        }
                    }, abort: function () {
                        var a = this;
                        a.state = e.IDLE, i && (i.exec.call(a, "Transporter", "clear"), a.trigger("TransportingAborted")), d.call(a)
                    }, destroy: function () {
                        this.unbindAll(), i = null, this.disconnectRuntime(), d.call(this)
                    }
                })
            }
            return e.IDLE = 0, e.BUSY = 1, e.DONE = 2, e.prototype = d.instance, e
        }), d("moxie/core/JSON", [], function () {
            return !!window.JSON && JSON.parse || function () {
                var a, c, d, e, f = {
                        '"': '"',
                        "\\": "\\",
                        "/": "/",
                        b: "\b",
                        f: "\f",
                        n: "\n",
                        r: "\r",
                        t: "	"
                    },
                    g = function (b) {
                        throw {
                            name: "SyntaxError",
                            message: b,
                            at: a,
                            text: d
                        }
                    },
                    h = function (b) {
                        return b && b !== c && g("Expected '" + b + "' instead of '" + c + "'"), c = d.charAt(a), a += 1, c
                    },
                    i = function () {
                        var a, b = "";
                        for ("-" === c && (b = "-", h("-")); c >= "0" && "9" >= c;) b += c, h();
                        if ("." === c)
                            for (b += "."; h() && c >= "0" && "9" >= c;) b += c;
                        if ("e" === c || "E" === c)
                            for (b += c, h(), ("-" === c || "+" === c) && (b += c, h()); c >= "0" && "9" >= c;) b += c, h();
                        return a = +b, isFinite(a) ? a : (g("Bad number"), void 0)
                    },
                    j = function () {
                        var a, b, d, e = "";
                        if ('"' === c)
                            for (; h();) {
                                if ('"' === c) return h(), e;
                                if ("\\" === c)
                                    if (h(), "u" === c) {
                                        for (d = 0, b = 0; 4 > b && (a = parseInt(h(), 16), isFinite(a)); b += 1) d = 16 * d + a;
                                        e += String.fromCharCode(d)
                                    } else {
                                        if ("string" != typeof f[c]) break;
                                        e += f[c]
                                    } else e += c
                            }
                        g("Bad string")
                    },
                    k = function () {
                        for (; c && " " >= c;) h()
                    },
                    l = function () {
                        switch (c) {
                        case "t":
                            return h("t"), h("r"), h("u"), h("e"), !0;
                        case "f":
                            return h("f"), h("a"), h("l"), h("s"), h("e"), !1;
                        case "n":
                            return h("n"), h("u"), h("l"), h("l"), null
                        }
                        g("Unexpected '" + c + "'")
                    },
                    m = function () {
                        var a = [];
                        if ("[" === c) {
                            if (h("["), k(), "]" === c) return h("]"), a;
                            for (; c;) {
                                if (a.push(e()), k(), "]" === c) return h("]"), a;
                                h(","), k()
                            }
                        }
                        g("Bad array")
                    },
                    n = function () {
                        var a, b = {};
                        if ("{" === c) {
                            if (h("{"), k(), "}" === c) return h("}"), b;
                            for (; c;) {
                                if (a = j(), k(), h(":"), Object.hasOwnProperty.call(b, a) && g('Duplicate key "' + a + '"'), b[a] = e(), k(), "}" === c) return h("}"), b;
                                h(","), k()
                            }
                        }
                        g("Bad object")
                    };
                return e = function () {
                        switch (k(), c) {
                        case "{":
                            return n();
                        case "[":
                            return m();
                        case '"':
                            return j();
                        case "-":
                            return i();
                        default:
                            return c >= "0" && "9" >= c ? i() : l()
                        }
                    },
                    function (f, h) {
                        var i;
                        return d = f, a = 0, c = " ", i = e(), k(), c && g("Syntax error"), "function" == typeof h ? function j(a, c) {
                            var d, e, f = a[c];
                            if (f && "object" == typeof f)
                                for (d in f) Object.prototype.hasOwnProperty.call(f, d) && (e = j(f, d), e !== b ? f[d] = e : delete f[d]);
                            return h.call(a, c, f)
                        }({
                            "": i
                        }, "") : i
                    }
            }()
        }), d("moxie/image/Image", ["moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/file/FileReaderSync", "moxie/xhr/XMLHttpRequest", "moxie/runtime/Runtime", "moxie/runtime/RuntimeClient", "moxie/runtime/Transporter", "moxie/core/utils/Env", "moxie/core/EventTarget", "moxie/file/Blob", "moxie/file/File", "moxie/core/utils/Encode", "moxie/core/JSON"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
            function o() {
                function d(b) {
                    if (b || (b = this.getRuntime().exec.call(this, "Image", "getInfo")), b)
                        if ("string" === a.typeOf(b.meta)) try {
                            this.meta = n(b.meta)
                        } catch (c) {} else this.meta = b.meta;
                    a.extend(this, {
                        size: parseInt(b.size, 10),
                        width: parseInt(b.width, 10),
                        height: parseInt(b.height, 10),
                        type: b.type
                    }), "" === this.name && (this.name = b.name)
                }

                function j(b) {
                    var d = a.typeOf(b);
                    try {
                        if (b instanceof o) {
                            if (!b.size) throw new c.DOMException(c.DOMException.INVALID_STATE_ERR);
                            q.apply(this, arguments)
                        } else if (b instanceof k) {
                            if (!~a.inArray(b.type, ["image/jpeg", "image/png"])) throw new c.ImageError(c.ImageError.WRONG_FORMAT);
                            r.apply(this, arguments)
                        } else if (-1 !== a.inArray(d, ["blob", "file"])) j.call(this, new l(null, b), arguments[1]);
                        else if ("string" === d) /^data:[^;]*;base64,/.test(b) ? j.call(this, new k(null, {
                            data: b
                        }), arguments[1]) : s.apply(this, arguments);
                        else {
                            if ("node" !== d || "img" !== b.nodeName.toLowerCase()) throw new c.DOMException(c.DOMException.TYPE_MISMATCH_ERR);
                            j.call(this, b.src, arguments[1])
                        }
                    } catch (e) {
                        this.trigger("error", e)
                    }
                }

                function q(b, c) {
                    var d = this.connectRuntime(b.ruid);
                    this.ruid = d.uid, d.exec.call(this, "Image", "loadFromImage", b, "undefined" === a.typeOf(c) ? !0 : c)
                }

                function r(b, c) {
                    function d(a) {
                        e.ruid = a.uid, a.exec.call(e, "Image", "loadFromBlob", b)
                    }
                    var e = this;
                    e.name = b.name || "", b.isDetached() ? (this.bind("RuntimeInit", function (a, b) {
                        d(b)
                    }), c && "string" == typeof c.required_caps && (c.required_caps = f.parseCaps(c.required_caps)), this.connectRuntime(a.extend({
                        required_caps: {
                            access_image_binary: !0,
                            resize_image: !0
                        }
                    }, c))) : d(this.connectRuntime(b.ruid))
                }

                function s(a, b) {
                    var c, d = this;
                    c = new e, c.open("get", a), c.responseType = "blob", c.onprogress = function (a) {
                        d.trigger(a)
                    }, c.onload = function () {
                        r.call(d, c.response, !0)
                    }, c.onerror = function (a) {
                        d.trigger(a)
                    }, c.onloadend = function () {
                        c.destroy()
                    }, c.bind("RuntimeError", function (a, b) {
                        d.trigger("RuntimeError", b)
                    }), c.send(null, b)
                }
                g.call(this), a.extend(this, {
                    uid: a.guid("uid_"),
                    ruid: null,
                    name: "",
                    size: 0,
                    width: 0,
                    height: 0,
                    type: "",
                    meta: {},
                    clone: function () {
                        this.load.apply(this, arguments)
                    }, load: function () {
                        this.bind("Load Resize", function () {
                            d.call(this)
                        }, 999), this.convertEventPropsToHandlers(p), j.apply(this, arguments)
                    }, downsize: function (b, d, e, f) {
                        try {
                            if (!this.size) throw new c.DOMException(c.DOMException.INVALID_STATE_ERR);
                            if (this.width > o.MAX_RESIZE_WIDTH || this.height > o.MAX_RESIZE_HEIGHT) throw new c.ImageError(c.ImageError.MAX_RESOLUTION_ERR);
                            (!b && !d || "undefined" === a.typeOf(e)) && (e = !1), b = b || this.width, d = d || this.height, f = "undefined" === a.typeOf(f) ? !0 : !!f, this.getRuntime().exec.call(this, "Image", "downsize", b, d, e, f)
                        } catch (g) {
                            this.trigger("error", g)
                        }
                    }, crop: function (a, b, c) {
                        this.downsize(a, b, !0, c)
                    }, getAsCanvas: function () {
                        if (!i.can("create_canvas")) throw new c.RuntimeError(c.RuntimeError.NOT_SUPPORTED_ERR);
                        var a = this.connectRuntime(this.ruid);
                        return a.exec.call(this, "Image", "getAsCanvas")
                    }, getAsBlob: function (a, b) {
                        if (!this.size) throw new c.DOMException(c.DOMException.INVALID_STATE_ERR);
                        return a || (a = "image/jpeg"), "image/jpeg" !== a || b || (b = 90), this.getRuntime().exec.call(this, "Image", "getAsBlob", a, b)
                    }, getAsDataURL: function (a, b) {
                        if (!this.size) throw new c.DOMException(c.DOMException.INVALID_STATE_ERR);
                        return this.getRuntime().exec.call(this, "Image", "getAsDataURL", a, b)
                    }, getAsBinaryString: function (a, b) {
                        var c = this.getAsDataURL(a, b);
                        return m.atob(c.substring(c.indexOf("base64,") + 7))
                    }, embed: function (d) {
                        function e() {
                            if (i.can("create_canvas")) {
                                var b = f.getAsCanvas();
                                if (b) return d.appendChild(b), b = null, f.destroy(), n.trigger("embedded"), void 0
                            }
                            var e = f.getAsDataURL(g, j);
                            if (!e) throw new c.ImageError(c.ImageError.WRONG_FORMAT);
                            if (i.can("use_data_uri_of", e.length)) d.innerHTML = '<img src="' + e + '" width="' + f.width + '" height="' + f.height + '" />', f.destroy(), n.trigger("embedded");
                            else {
                                var k = new h;
                                k.bind("TransportingComplete", function () {
                                    l = n.connectRuntime(this.result.ruid), n.bind("Embedded", function () {
                                        a.extend(l.getShimContainer().style, {
                                            top: "0px",
                                            left: "0px",
                                            width: f.width + "px",
                                            height: f.height + "px"
                                        }), l = null
                                    }, 999), l.exec.call(n, "ImageView", "display", this.result.uid, q, r), f.destroy()
                                }), k.transport(m.atob(e.substring(e.indexOf("base64,") + 7)), g, a.extend({}, p, {
                                    required_caps: {
                                        display_media: !0
                                    },
                                    runtime_order: "flash,silverlight",
                                    container: d
                                }))
                            }
                        }
                        var f, g, j, k, l, n = this,
                            p = arguments[1] || {},
                            q = this.width,
                            r = this.height;
                        try {
                            if (!(d = b.get(d))) throw new c.DOMException(c.DOMException.INVALID_NODE_TYPE_ERR);
                            if (!this.size) throw new c.DOMException(c.DOMException.INVALID_STATE_ERR);
                            if (this.width > o.MAX_RESIZE_WIDTH || this.height > o.MAX_RESIZE_HEIGHT) throw new c.ImageError(c.ImageError.MAX_RESOLUTION_ERR);
                            if (g = p.type || this.type || "image/jpeg", j = p.quality || 90, k = "undefined" !== a.typeOf(p.crop) ? p.crop : !1, p.width) q = p.width, r = p.height || q;
                            else {
                                var s = b.getSize(d);
                                s.w && s.h && (q = s.w, r = s.h)
                            }
                            return f = new o, f.bind("Resize", function () {
                                e.call(n)
                            }), f.bind("Load", function () {
                                f.downsize(q, r, k, !1)
                            }), f.clone(this, !1), f
                        } catch (t) {
                            this.trigger("error", t)
                        }
                    }, destroy: function () {
                        this.ruid && (this.getRuntime().exec.call(this, "Image", "destroy"), this.disconnectRuntime()), this.unbindAll()
                    }
                })
            }
            var p = ["progress", "load", "error", "resize", "embedded"];
            return o.MAX_RESIZE_WIDTH = 6500, o.MAX_RESIZE_HEIGHT = 6500, o.prototype = j.instance, o
        }), d("moxie/runtime/html5/Runtime", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/Runtime", "moxie/core/utils/Env"], function (a, b, c, d) {
            function e(b) {
                var e = this,
                    h = c.capTest,
                    i = c.capTrue,
                    j = a.extend({
                        access_binary: h(window.FileReader || window.File && window.File.getAsDataURL),
                        access_image_binary: function () {
                            return e.can("access_binary") && !!g.Image
                        }, display_media: h(d.can("create_canvas") || d.can("use_data_uri_over32kb")),
                        do_cors: h(window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
                        drag_and_drop: h(function () {
                            var a = document.createElement("div");
                            return ("draggable" in a || "ondragstart" in a && "ondrop" in a) && ("IE" !== d.browser || d.version > 9)
                        }()),
                        filter_by_extension: h(function () {
                            return "Chrome" === d.browser && d.version >= 28 || "IE" === d.browser && d.version >= 10
                        }()),
                        return_response_headers: i,
                        return_response_type: function (a) {
                            return "json" === a ? !0 : d.can("return_response_type", a)
                        }, return_status_code: i,
                        report_upload_progress: h(window.XMLHttpRequest && (new XMLHttpRequest).upload),
                        resize_image: function () {
                            return e.can("access_binary") && d.can("create_canvas")
                        }, select_file: function () {
                            return d.can("use_fileinput") && window.File
                        }, select_folder: function () {
                            return e.can("select_file") && "Chrome" === d.browser && d.version >= 21
                        }, select_multiple: function () {
                            return e.can("select_file") && !("Safari" === d.browser && "Windows" === d.OS)
                        }, send_binary_string: h(window.XMLHttpRequest && ((new XMLHttpRequest).sendAsBinary || window.Uint8Array && window.ArrayBuffer)),
                        send_custom_headers: h(window.XMLHttpRequest),
                        send_multipart: function () {
                            return !!(window.XMLHttpRequest && (new XMLHttpRequest).upload && window.FormData) || e.can("send_binary_string")
                        }, slice_blob: h(window.File && (File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice)),
                        stream_upload: function () {
                            return e.can("slice_blob") && e.can("send_multipart")
                        }, summon_file_dialog: h(function () {
                            return "Firefox" === d.browser && d.version >= 4 || "Opera" === d.browser && d.version >= 12 || "IE" === d.browser && d.version >= 10 || !!~a.inArray(d.browser, ["Chrome", "Safari"])
                        }()),
                        upload_filesize: i
                    }, arguments[2]);
                c.call(this, b, arguments[1] || f, j), a.extend(this, {
                    init: function () {
                        this.trigger("Init")
                    }, destroy: function (a) {
                        return function () {
                            a.call(e), a = e = null
                        }
                    }(this.destroy)
                }), a.extend(this.getShim(), g)
            }
            var f = "html5",
                g = {};
            return c.addConstructor(f, e), g
        }), d("moxie/runtime/html5/file/Blob", ["moxie/runtime/html5/Runtime", "moxie/file/Blob"], function (a, b) {
            function c() {
                function a(a, b, c) {
                    var d;
                    if (!window.File.prototype.slice) return (d = window.File.prototype.webkitSlice || window.File.prototype.mozSlice) ? d.call(a, b, c) : null;
                    try {
                        return a.slice(), a.slice(b, c)
                    } catch (e) {
                        return a.slice(b, c - b)
                    }
                }
                this.slice = function () {
                    return new b(this.getRuntime().uid, a.apply(this, arguments))
                }
            }
            return a.Blob = c
        }), d("moxie/core/utils/Events", ["moxie/core/utils/Basic"], function (a) {
            function b() {
                this.returnValue = !1
            }

            function c() {
                this.cancelBubble = !0
            }
            var d = {},
                e = "moxie_" + a.guid(),
                f = function (f, g, h, i) {
                    var j, k;
                    g = g.toLowerCase(), f.addEventListener ? (j = h, f.addEventListener(g, j, !1)) : f.attachEvent && (j = function () {
                        var a = window.event;
                        a.target || (a.target = a.srcElement), a.preventDefault = b, a.stopPropagation = c, h(a)
                    }, f.attachEvent("on" + g, j)), f[e] || (f[e] = a.guid()), d.hasOwnProperty(f[e]) || (d[f[e]] = {}), k = d[f[e]], k.hasOwnProperty(g) || (k[g] = []), k[g].push({
                        func: j,
                        orig: h,
                        key: i
                    })
                },
                g = function (b, c, f) {
                    var g, h;
                    if (c = c.toLowerCase(), b[e] && d[b[e]] && d[b[e]][c]) {
                        g = d[b[e]][c];
                        for (var i = g.length - 1; i >= 0 && (g[i].orig !== f && g[i].key !== f || (b.removeEventListener ? b.removeEventListener(c, g[i].func, !1) : b.detachEvent && b.detachEvent("on" + c, g[i].func), g[i].orig = null, g[i].func = null, g.splice(i, 1), f === h)); i--);
                        if (g.length || delete d[b[e]][c], a.isEmptyObj(d[b[e]])) {
                            delete d[b[e]];
                            try {
                                delete b[e]
                            } catch (j) {
                                b[e] = h
                            }
                        }
                    }
                },
                h = function (b, c) {
                    b && b[e] && a.each(d[b[e]], function (a, d) {
                        g(b, d, c)
                    })
                };
            return {
                addEvent: f,
                removeEvent: g,
                removeAllEvents: h
            }
        }), d("moxie/runtime/html5/file/FileInput", ["moxie/runtime/html5/Runtime", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/utils/Events", "moxie/core/utils/Mime", "moxie/core/utils/Env"], function (a, b, c, d, e, f) {
            function g() {
                var a, g = [];
                b.extend(this, {
                    init: function (h) {
                        var i, j, k, l, m, n, o = this,
                            p = o.getRuntime();
                        a = h, g = [], k = a.accept.mimes || e.extList2mimes(a.accept, p.can("filter_by_extension")), j = p.getShimContainer(), j.innerHTML = '<input id="' + p.uid + '" type="file" style="font-size:999px;opacity:0;"' + (a.multiple && p.can("select_multiple") ? "multiple" : "") + (a.directory && p.can("select_folder") ? "webkitdirectory directory" : "") + (k ? ' accept="' + k.join(",") + '"' : "") + " />", i = c.get(p.uid), b.extend(i.style, {
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%"
                        }), l = c.get(a.browse_button), p.can("summon_file_dialog") && ("static" === c.getStyle(l, "position") && (l.style.position = "relative"), m = parseInt(c.getStyle(l, "z-index"), 10) || 1, l.style.zIndex = m, j.style.zIndex = m - 1, d.addEvent(l, "click", function (a) {
                            var b = c.get(p.uid);
                            b && !b.disabled && b.click(), a.preventDefault()
                        }, o.uid)), n = p.can("summon_file_dialog") ? l : j, d.addEvent(n, "mouseover", function () {
                            o.trigger("mouseenter")
                        }, o.uid), d.addEvent(n, "mouseout", function () {
                            o.trigger("mouseleave")
                        }, o.uid), d.addEvent(n, "mousedown", function () {
                            o.trigger("mousedown")
                        }, o.uid), d.addEvent(c.get(a.container), "mouseup", function () {
                            o.trigger("mouseup")
                        }, o.uid), i.onchange = function q() {
                            if (g = [], a.directory ? b.each(this.files, function (a) {
                                "." !== a.name && g.push(a)
                            }) : g = [].slice.call(this.files), "IE" !== f.browser) this.value = "";
                            else {
                                var c = this.cloneNode(!0);
                                this.parentNode.replaceChild(c, this), c.onchange = q
                            }
                            o.trigger("change")
                        }, o.trigger({
                            type: "ready",
                            async: !0
                        }), j = null
                    }, getFiles: function () {
                        return g
                    }, disable: function (a) {
                        var b, d = this.getRuntime();
                        (b = c.get(d.uid)) && (b.disabled = !!a)
                    }, destroy: function () {
                        var b = this.getRuntime(),
                            e = b.getShimContainer();
                        d.removeAllEvents(e, this.uid), d.removeAllEvents(a && c.get(a.container), this.uid), d.removeAllEvents(a && c.get(a.browse_button), this.uid), e && (e.innerHTML = ""), g = a = null
                    }
                })
            }
            return a.FileInput = g
        }), d("moxie/runtime/html5/file/FileDrop", ["moxie/runtime/html5/Runtime", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/utils/Events", "moxie/core/utils/Mime"], function (a, b, c, d, e) {
            function f() {
                function a(a) {
                    for (var c = [], d = 0; d < a.length; d++)[].push.apply(c, a[d].extensions.split(/\s*,\s*/));
                    return -1 === b.inArray("*", c) ? c : []
                }

                function f(a) {
                    var c = e.getFileExtension(a.name);
                    return !c || !l.length || -1 !== b.inArray(c, l)
                }

                function g(a, c) {
                    var d = [];
                    b.each(a, function (a) {
                        d.push(function (b) {
                            h(a, b)
                        })
                    }), b.inSeries(d, function () {
                        c()
                    })
                }

                function h(a, b) {
                    a.isFile ? a.file(function (a) {
                        f(a) && k.push(a), b()
                    }, function () {
                        b()
                    }) : a.isDirectory ? i(a, b) : b()
                }

                function i(a, b) {
                    function c(a) {
                        e.readEntries(function (b) {
                            b.length ? ([].push.apply(d, b), c(a)) : a()
                        }, a)
                    }
                    var d = [],
                        e = a.createReader();
                    c(function () {
                        g(d, b)
                    })
                }
                var j, k = [],
                    l = [];
                b.extend(this, {
                    init: function (c) {
                        var e, h = this;
                        j = c, l = a(j.accept), e = j.container, d.addEvent(e, "dragover", function (a) {
                            a.preventDefault(), a.stopPropagation(), a.dataTransfer.dropEffect = "copy"
                        }, h.uid), d.addEvent(e, "drop", function (a) {
                            if (a.preventDefault(), a.stopPropagation(), k = [], a.dataTransfer.items && a.dataTransfer.items[0].webkitGetAsEntry) {
                                var c = [];
                                b.each(a.dataTransfer.items, function (a) {
                                    c.push(a.webkitGetAsEntry())
                                }), g(c, function () {
                                    h.trigger("drop")
                                })
                            } else b.each(a.dataTransfer.files, function (a) {
                                f(a) && k.push(a)
                            }), h.trigger("drop")
                        }, h.uid), d.addEvent(e, "dragenter", function (a) {
                            a.preventDefault(), a.stopPropagation(), h.trigger("dragenter")
                        }, h.uid), d.addEvent(e, "dragleave", function (a) {
                            a.preventDefault(), a.stopPropagation(), h.trigger("dragleave")
                        }, h.uid)
                    }, getFiles: function () {
                        return k
                    }, destroy: function () {
                        d.removeAllEvents(j && c.get(j.container), this.uid), k = l = j = null
                    }
                })
            }
            return a.FileDrop = f
        }), d("moxie/runtime/html5/file/FileReader", ["moxie/runtime/html5/Runtime", "moxie/core/utils/Encode", "moxie/core/utils/Basic"], function (a, b, c) {
            function d() {
                function a(a) {
                    return b.atob(a.substring(a.indexOf("base64,") + 7))
                }
                var d, e = !1;
                c.extend(this, {
                    read: function (a, b) {
                        var f = this;
                        d = new window.FileReader, d.addEventListener("progress", function (a) {
                            f.trigger(a)
                        }), d.addEventListener("load", function (a) {
                            f.trigger(a)
                        }), d.addEventListener("error", function (a) {
                            f.trigger(a, d.error)
                        }), d.addEventListener("loadend", function () {
                            d = null
                        }), "function" === c.typeOf(d[a]) ? (e = !1, d[a](b.getSource())) : "readAsBinaryString" === a && (e = !0, d.readAsDataURL(b.getSource()))
                    }, getResult: function () {
                        return d && d.result ? e ? a(d.result) : d.result : null
                    }, abort: function () {
                        d && d.abort()
                    }, destroy: function () {
                        d = null
                    }
                })
            }
            return a.FileReader = d
        }), d("moxie/runtime/html5/xhr/XMLHttpRequest", ["moxie/runtime/html5/Runtime", "moxie/core/utils/Basic", "moxie/core/utils/Mime", "moxie/core/utils/Url", "moxie/file/File", "moxie/file/Blob", "moxie/xhr/FormData", "moxie/core/Exceptions", "moxie/core/utils/Env", "moxie/core/JSON"], function (a, b, c, d, e, f, g, h, i, j) {
            function k() {
                function a(a, b) {
                    var c, d, e = this;
                    c = b.getBlob().getSource(), d = new window.FileReader, d.onload = function () {
                        b.append(b.getBlobName(), new f(null, {
                            type: c.type,
                            data: d.result
                        })), self.send.call(e, a, b)
                    }, d.readAsBinaryString(c)
                }

                function k() {
                    return !window.XMLHttpRequest || "IE" === i.browser && i.version < 8 ? function () {
                        for (var a = ["Msxml2.XMLHTTP.6.0", "Microsoft.XMLHTTP"], b = 0; b < a.length; b++) try {
                            return new ActiveXObject(a[b])
                        } catch (c) {}
                    }() : new window.XMLHttpRequest
                }

                function l(a) {
                    var b = a.responseXML,
                        c = a.responseText;
                    return "IE" === i.browser && c && b && !b.documentElement && /[^\/]+\/[^\+]+\+xml/.test(a.getResponseHeader("Content-Type")) && (b = new window.ActiveXObject("Microsoft.XMLDOM"), b.async = !1, b.validateOnParse = !1, b.loadXML(c)), b && ("IE" === i.browser && 0 !== b.parseError || !b.documentElement || "parsererror" === b.documentElement.tagName) ? null : b
                }

                function m(a) {
                    var b = "----moxieboundary" + (new Date).getTime(),
                        c = "--",
                        d = "\r\n",
                        e = "",
                        g = this.getRuntime();
                    if (!g.can("send_binary_string")) throw new h.RuntimeError(h.RuntimeError.NOT_SUPPORTED_ERR);
                    return n.setRequestHeader("Content-Type", "multipart/form-data; boundary=" + b), a.each(function (a, g) {
                        e += a instanceof f ? c + b + d + 'Content-Disposition: form-data; name="' + g + '"; filename="' + unescape(encodeURIComponent(a.name || "blob")) + '"' + d + "Content-Type: " + a.type + d + d + a.getSource() + d : c + b + d + 'Content-Disposition: form-data; name="' + g + '"' + d + d + unescape(encodeURIComponent(a)) + d
                    }), e += c + b + c + d
                }
                var n, o;
                b.extend(this, {
                    send: function (c, e) {
                        var h = this,
                            j = "Mozilla" === i.browser && i.version >= 4 && i.version < 7,
                            l = "Android Browser" === i.browser,
                            p = !1;
                        if (o = c.url.replace(/^.+?\/([\w\-\.]+)$/, "$1").toLowerCase(), n = k(), n.open(c.method, c.url, c.async, c.user, c.password), e instanceof f) e.isDetached() && (p = !0), e = e.getSource();
                        else if (e instanceof g) {
                            if (e.hasBlob())
                                if (e.getBlob().isDetached()) e = m.call(h, e), p = !0;
                                else if ((j || l) && "blob" === b.typeOf(e.getBlob().getSource()) && window.FileReader) return a.call(h, c, e), void 0;
                            if (e instanceof g) {
                                var q = new window.FormData;
                                e.each(function (a, b) {
                                    a instanceof f ? q.append(b, a.getSource()) : q.append(b, a)
                                }), e = q
                            }
                        }
                        n.upload ? (c.withCredentials && (n.withCredentials = !0), n.addEventListener("load", function (a) {
                            h.trigger(a)
                        }), n.addEventListener("error", function (a) {
                            h.trigger(a)
                        }), n.addEventListener("progress", function (a) {
                            h.trigger(a)
                        }), n.upload.addEventListener("progress", function (a) {
                            h.trigger({
                                type: "UploadProgress",
                                loaded: a.loaded,
                                total: a.total
                            })
                        })) : n.onreadystatechange = function () {
                            switch (n.readyState) {
                            case 1:
                                break;
                            case 2:
                                break;
                            case 3:
                                var a, b;
                                try {
                                    d.hasSameOrigin(c.url) && (a = n.getResponseHeader("Content-Length") || 0), n.responseText && (b = n.responseText.length)
                                } catch (e) {
                                    a = b = 0
                                }
                                h.trigger({
                                    type: "progress",
                                    lengthComputable: !!a,
                                    total: parseInt(a, 10),
                                    loaded: b
                                });
                                break;
                            case 4:
                                n.onreadystatechange = function () {}, 0 === n.status ? h.trigger("error") : h.trigger("load")
                            }
                        }, b.isEmptyObj(c.headers) || b.each(c.headers, function (a, b) {
                            n.setRequestHeader(b, a)
                        }), "" !== c.responseType && "responseType" in n && (n.responseType = "json" !== c.responseType || i.can("return_response_type", "json") ? c.responseType : "text"), p ? n.sendAsBinary ? n.sendAsBinary(e) : ! function () {
                            for (var a = new Uint8Array(e.length), b = 0; b < e.length; b++) a[b] = 255 & e.charCodeAt(b);
                            n.send(a.buffer)
                        }() : n.send(e), h.trigger("loadstart")
                    }, getStatus: function () {
                        try {
                            if (n) return n.status
                        } catch (a) {}
                        return 0
                    }, getResponse: function (a) {
                        var b = this.getRuntime();
                        try {
                            switch (a) {
                            case "blob":
                                var d = new e(b.uid, n.response),
                                    f = n.getResponseHeader("Content-Disposition");
                                if (f) {
                                    var g = f.match(/filename=([\'\"'])([^\1]+)\1/);
                                    g && (o = g[2])
                                }
                                return d.name = o, d.type || (d.type = c.getFileMime(o)), d;
                            case "json":
                                return i.can("return_response_type", "json") ? n.response : 200 === n.status ? j(n.responseText) : null;
                            case "document":
                                return l(n);
                            default:
                                return "" !== n.responseText ? n.responseText : null
                            }
                        } catch (h) {
                            return null
                        }
                    }, getAllResponseHeaders: function () {
                        try {
                            return n.getAllResponseHeaders()
                        } catch (a) {}
                        return ""
                    }, abort: function () {
                        n && n.abort()
                    }, destroy: function () {
                        self = o = null
                    }
                })
            }
            return a.XMLHttpRequest = k
        }), d("moxie/runtime/html5/utils/BinaryReader", [], function () {
            return function () {
                function a(a, b) {
                    var c, d = f ? 0 : -8 * (b - 1),
                        g = 0;
                    for (c = 0; b > c; c++) g |= e.charCodeAt(a + c) << Math.abs(d + 8 * c);
                    return g
                }

                function c(a, b, c) {
                    c = 3 === arguments.length ? c : e.length - b - 1, e = e.substr(0, b) + a + e.substr(c + b)
                }

                function d(a, b, d) {
                    var e, g = "",
                        h = f ? 0 : -8 * (d - 1);
                    for (e = 0; d > e; e++) g += String.fromCharCode(255 & b >> Math.abs(h + 8 * e));
                    c(g, a, d)
                }
                var e, f = !1;
                return {
                    II: function (a) {
                        return a === b ? f : (f = a, void 0)
                    }, init: function (a) {
                        f = !1, e = a
                    }, SEGMENT: function (a, b, d) {
                        switch (arguments.length) {
                        case 1:
                            return e.substr(a, e.length - a - 1);
                        case 2:
                            return e.substr(a, b);
                        case 3:
                            c(d, a, b);
                            break;
                        default:
                            return e
                        }
                    }, BYTE: function (b) {
                        return a(b, 1)
                    }, SHORT: function (b) {
                        return a(b, 2)
                    }, LONG: function (c, e) {
                        return e === b ? a(c, 4) : (d(c, e, 4), void 0)
                    }, SLONG: function (b) {
                        var c = a(b, 4);
                        return c > 2147483647 ? c - 4294967296 : c
                    }, STRING: function (b, c) {
                        var d = "";
                        for (c += b; c > b; b++) d += String.fromCharCode(a(b, 1));
                        return d
                    }
                }
            }
        }), d("moxie/runtime/html5/image/JPEGHeaders", ["moxie/runtime/html5/utils/BinaryReader"], function (a) {
            return function b(c) {
                var d, e, f, g = [],
                    h = 0;
                if (d = new a, d.init(c), 65496 === d.SHORT(0)) {
                    for (e = 2; e <= c.length;)
                        if (f = d.SHORT(e), f >= 65488 && 65495 >= f) e += 2;
                        else {
                            if (65498 === f || 65497 === f) break;
                            h = d.SHORT(e + 2) + 2, f >= 65505 && 65519 >= f && g.push({
                                hex: f,
                                name: "APP" + (15 & f),
                                start: e,
                                length: h,
                                segment: d.SEGMENT(e, h)
                            }), e += h
                        }
                    return d.init(null), {
                        headers: g,
                        restore: function (a) {
                            var b, c;
                            for (d.init(a), e = 65504 == d.SHORT(2) ? 4 + d.SHORT(4) : 2, c = 0, b = g.length; b > c; c++) d.SEGMENT(e, 0, g[c].segment), e += g[c].length;
                            return a = d.SEGMENT(), d.init(null), a
                        }, strip: function (a) {
                            var c, e, f;
                            for (e = new b(a), c = e.headers, e.purge(), d.init(a), f = c.length; f--;) d.SEGMENT(c[f].start, c[f].length, "");
                            return a = d.SEGMENT(), d.init(null), a
                        }, get: function (a) {
                            for (var b = [], c = 0, d = g.length; d > c; c++) g[c].name === a.toUpperCase() && b.push(g[c].segment);
                            return b
                        }, set: function (a, b) {
                            var c, d, e, f = [];
                            for ("string" == typeof b ? f.push(b) : f = b, c = d = 0, e = g.length; e > c && (g[c].name === a.toUpperCase() && (g[c].segment = f[d], g[c].length = f[d].length, d++), !(d >= f.length)); c++);
                        }, purge: function () {
                            g = [], d.init(null), d = null
                        }
                    }
                }
            }
        }), d("moxie/runtime/html5/image/ExifParser", ["moxie/core/utils/Basic", "moxie/runtime/html5/utils/BinaryReader"], function (a, c) {
            return function () {
                function d(a, c) {
                    var d, e, f, h, i, l, m, n, o = g.SHORT(a),
                        p = [],
                        q = {};
                    for (d = 0; o > d; d++)
                        if (m = l = a + 12 * d + 2, f = c[g.SHORT(m)], f !== b) {
                            switch (h = g.SHORT(m += 2), i = g.LONG(m += 2), m += 4, p = [], h) {
                            case 1:
                            case 7:
                                for (i > 4 && (m = g.LONG(m) + k.tiffHeader), e = 0; i > e; e++) p[e] = g.BYTE(m + e);
                                break;
                            case 2:
                                i > 4 && (m = g.LONG(m) + k.tiffHeader), q[f] = g.STRING(m, i - 1);
                                continue;
                            case 3:
                                for (i > 2 && (m = g.LONG(m) + k.tiffHeader), e = 0; i > e; e++) p[e] = g.SHORT(m + 2 * e);
                                break;
                            case 4:
                                for (i > 1 && (m = g.LONG(m) + k.tiffHeader), e = 0; i > e; e++) p[e] = g.LONG(m + 4 * e);
                                break;
                            case 5:
                                for (m = g.LONG(m) + k.tiffHeader, e = 0; i > e; e++) p[e] = g.LONG(m + 4 * e) / g.LONG(m + 4 * e + 4);
                                break;
                            case 9:
                                for (m = g.LONG(m) + k.tiffHeader, e = 0; i > e; e++) p[e] = g.SLONG(m + 4 * e);
                                break;
                            case 10:
                                for (m = g.LONG(m) + k.tiffHeader, e = 0; i > e; e++) p[e] = g.SLONG(m + 4 * e) / g.SLONG(m + 4 * e + 4);
                                break;
                            default:
                                continue
                            }
                            n = 1 == i ? p[0] : p, q[f] = j.hasOwnProperty(f) && "object" != typeof n ? j[f][n] : n
                        }
                    return q
                }

                function e() {
                    var a = k.tiffHeader;
                    return g.II(18761 == g.SHORT(a)), 42 !== g.SHORT(a += 2) ? !1 : (k.IFD0 = k.tiffHeader + g.LONG(a += 2), i = d(k.IFD0, h.tiff), "ExifIFDPointer" in i && (k.exifIFD = k.tiffHeader + i.ExifIFDPointer, delete i.ExifIFDPointer), "GPSInfoIFDPointer" in i && (k.gpsIFD = k.tiffHeader + i.GPSInfoIFDPointer, delete i.GPSInfoIFDPointer), !0)
                }

                function f(a, b, c) {
                    var d, e, f, i = 0;
                    if ("string" == typeof b) {
                        var j = h[a.toLowerCase()];
                        for (var l in j)
                            if (j[l] === b) {
                                b = l;
                                break
                            }
                    }
                    d = k[a.toLowerCase() + "IFD"], e = g.SHORT(d);
                    for (var m = 0; e > m; m++)
                        if (f = d + 12 * m + 2, g.SHORT(f) == b) {
                            i = f + 8;
                            break
                        }
                    return i ? (g.LONG(i, c), !0) : !1
                }
                var g, h, i, j, k = {};
                return g = new c, h = {
                    tiff: {
                        274: "Orientation",
                        270: "ImageDescription",
                        271: "Make",
                        272: "Model",
                        305: "Software",
                        34665: "ExifIFDPointer",
                        34853: "GPSInfoIFDPointer"
                    },
                    exif: {
                        36864: "ExifVersion",
                        40961: "ColorSpace",
                        40962: "PixelXDimension",
                        40963: "PixelYDimension",
                        36867: "DateTimeOriginal",
                        33434: "ExposureTime",
                        33437: "FNumber",
                        34855: "ISOSpeedRatings",
                        37377: "ShutterSpeedValue",
                        37378: "ApertureValue",
                        37383: "MeteringMode",
                        37384: "LightSource",
                        37385: "Flash",
                        37386: "FocalLength",
                        41986: "ExposureMode",
                        41987: "WhiteBalance",
                        41990: "SceneCaptureType",
                        41988: "DigitalZoomRatio",
                        41992: "Contrast",
                        41993: "Saturation",
                        41994: "Sharpness"
                    },
                    gps: {
                        0: "GPSVersionID",
                        1: "GPSLatitudeRef",
                        2: "GPSLatitude",
                        3: "GPSLongitudeRef",
                        4: "GPSLongitude"
                    }
                }, j = {
                    ColorSpace: {
                        1: "sRGB",
                        0: "Uncalibrated"
                    },
                    MeteringMode: {
                        0: "Unknown",
                        1: "Average",
                        2: "CenterWeightedAverage",
                        3: "Spot",
                        4: "MultiSpot",
                        5: "Pattern",
                        6: "Partial",
                        255: "Other"
                    },
                    LightSource: {
                        1: "Daylight",
                        2: "Fliorescent",
                        3: "Tungsten",
                        4: "Flash",
                        9: "Fine weather",
                        10: "Cloudy weather",
                        11: "Shade",
                        12: "Daylight fluorescent (D 5700 - 7100K)",
                        13: "Day white fluorescent (N 4600 -5400K)",
                        14: "Cool white fluorescent (W 3900 - 4500K)",
                        15: "White fluorescent (WW 3200 - 3700K)",
                        17: "Standard light A",
                        18: "Standard light B",
                        19: "Standard light C",
                        20: "D55",
                        21: "D65",
                        22: "D75",
                        23: "D50",
                        24: "ISO studio tungsten",
                        255: "Other"
                    },
                    Flash: {
                        0: "Flash did not fire.",
                        1: "Flash fired.",
                        5: "Strobe return light not detected.",
                        7: "Strobe return light detected.",
                        9: "Flash fired, compulsory flash mode",
                        13: "Flash fired, compulsory flash mode, return light not detected",
                        15: "Flash fired, compulsory flash mode, return light detected",
                        16: "Flash did not fire, compulsory flash mode",
                        24: "Flash did not fire, auto mode",
                        25: "Flash fired, auto mode",
                        29: "Flash fired, auto mode, return light not detected",
                        31: "Flash fired, auto mode, return light detected",
                        32: "No flash function",
                        65: "Flash fired, red-eye reduction mode",
                        69: "Flash fired, red-eye reduction mode, return light not detected",
                        71: "Flash fired, red-eye reduction mode, return light detected",
                        73: "Flash fired, compulsory flash mode, red-eye reduction mode",
                        77: "Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",
                        79: "Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",
                        89: "Flash fired, auto mode, red-eye reduction mode",
                        93: "Flash fired, auto mode, return light not detected, red-eye reduction mode",
                        95: "Flash fired, auto mode, return light detected, red-eye reduction mode"
                    },
                    ExposureMode: {
                        0: "Auto exposure",
                        1: "Manual exposure",
                        2: "Auto bracket"
                    },
                    WhiteBalance: {
                        0: "Auto white balance",
                        1: "Manual white balance"
                    },
                    SceneCaptureType: {
                        0: "Standard",
                        1: "Landscape",
                        2: "Portrait",
                        3: "Night scene"
                    },
                    Contrast: {
                        0: "Normal",
                        1: "Soft",
                        2: "Hard"
                    },
                    Saturation: {
                        0: "Normal",
                        1: "Low saturation",
                        2: "High saturation"
                    },
                    Sharpness: {
                        0: "Normal",
                        1: "Soft",
                        2: "Hard"
                    },
                    GPSLatitudeRef: {
                        N: "North latitude",
                        S: "South latitude"
                    },
                    GPSLongitudeRef: {
                        E: "East longitude",
                        W: "West longitude"
                    }
                }, {
                    init: function (a) {
                        return k = {
                            tiffHeader: 10
                        }, a !== b && a.length ? (g.init(a), 65505 === g.SHORT(0) && "EXIF\x00" === g.STRING(4, 5).toUpperCase() ? e() : !1) : !1
                    }, TIFF: function () {
                        return i
                    }, EXIF: function () {
                        var b;
                        if (b = d(k.exifIFD, h.exif), b.ExifVersion && "array" === a.typeOf(b.ExifVersion)) {
                            for (var c = 0, e = ""; c < b.ExifVersion.length; c++) e += String.fromCharCode(b.ExifVersion[c]);
                            b.ExifVersion = e
                        }
                        return b
                    }, GPS: function () {
                        var b;
                        return b = d(k.gpsIFD, h.gps), b.GPSVersionID && "array" === a.typeOf(b.GPSVersionID) && (b.GPSVersionID = b.GPSVersionID.join(".")), b
                    }, setExif: function (a, b) {
                        return "PixelXDimension" !== a && "PixelYDimension" !== a ? !1 : f("exif", a, b)
                    }, getBinary: function () {
                        return g.SEGMENT()
                    }, purge: function () {
                        g.init(null), g = i = null, k = {}
                    }
                }
            }
        }), d("moxie/runtime/html5/image/JPEG", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/html5/image/JPEGHeaders", "moxie/runtime/html5/utils/BinaryReader", "moxie/runtime/html5/image/ExifParser"], function (a, b, c, d, e) {
            function f(f) {
                function g() {
                    for (var a, b, c = 0; c <= i.length;) {
                        if (a = j.SHORT(c += 2), a >= 65472 && 65475 >= a) return c += 5, {
                            height: j.SHORT(c),
                            width: j.SHORT(c += 2)
                        };
                        b = j.SHORT(c += 2), c += b - 2
                    }
                    return null
                }

                function h() {
                    l && k && j && (l.purge(), k.purge(), j.init(null), i = m = k = l = j = null)
                }
                var i, j, k, l, m, n;
                if (i = f, j = new d, j.init(i), 65496 !== j.SHORT(0)) throw new b.ImageError(b.ImageError.WRONG_FORMAT);
                k = new c(f), l = new e, n = !!l.init(k.get("app1")[0]), m = g.call(this), a.extend(this, {
                    type: "image/jpeg",
                    size: i.length,
                    width: m && m.width || 0,
                    height: m && m.height || 0,
                    setExif: function (b, c) {
                        return n ? ("object" === a.typeOf(b) ? a.each(b, function (a, b) {
                            l.setExif(b, a)
                        }) : l.setExif(b, c), k.set("app1", l.getBinary()), void 0) : !1
                    }, writeHeaders: function () {
                        return arguments.length ? k.restore(arguments[0]) : i = k.restore(i)
                    }, stripHeaders: function (a) {
                        return k.strip(a)
                    }, purge: function () {
                        h.call(this)
                    }
                }), n && (this.meta = {
                    tiff: l.TIFF(),
                    exif: l.EXIF(),
                    gps: l.GPS()
                })
            }
            return f
        }), d("moxie/runtime/html5/image/PNG", ["moxie/core/Exceptions", "moxie/core/utils/Basic", "moxie/runtime/html5/utils/BinaryReader"], function (a, b, c) {
            function d(d) {
                function e() {
                    var a, b;
                    return a = g.call(this, 8), "IHDR" == a.type ? (b = a.start, {
                        width: i.LONG(b),
                        height: i.LONG(b += 4)
                    }) : null
                }

                function f() {
                    i && (i.init(null), h = l = j = k = i = null)
                }

                function g(a) {
                    var b, c, d, e;
                    return b = i.LONG(a), c = i.STRING(a += 4, 4), d = a += 4, e = i.LONG(a + b), {
                        length: b,
                        type: c,
                        start: d,
                        CRC: e
                    }
                }
                var h, i, j, k, l;
                h = d, i = new c, i.init(h),
                    function () {
                        var b = 0,
                            c = 0,
                            d = [35152, 20039, 3338, 6666];
                        for (c = 0; c < d.length; c++, b += 2)
                            if (d[c] != i.SHORT(b)) throw new a.ImageError(a.ImageError.WRONG_FORMAT)
                    }(), l = e.call(this), b.extend(this, {
                        type: "image/png",
                        size: h.length,
                        width: l.width,
                        height: l.height,
                        purge: function () {
                            f.call(this)
                        }
                    }), f.call(this)
            }
            return d
        }), d("moxie/runtime/html5/image/ImageInfo", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/html5/image/JPEG", "moxie/runtime/html5/image/PNG"], function (a, b, c, d) {
            return function (e) {
                var f, g = [c, d];
                f = function () {
                    for (var a = 0; a < g.length; a++) try {
                        return new g[a](e)
                    } catch (c) {}
                    throw new b.ImageError(b.ImageError.WRONG_FORMAT)
                }(), a.extend(this, {
                    type: "",
                    size: 0,
                    width: 0,
                    height: 0,
                    setExif: function () {}, writeHeaders: function (a) {
                        return a
                    }, stripHeaders: function (a) {
                        return a
                    }, purge: function () {}
                }), a.extend(this, f), this.purge = function () {
                    f.purge(), f = null
                }
            }
        }), d("moxie/runtime/html5/image/MegaPixel", [], function () {
            function a(a, d, e) {
                var f = a.naturalWidth,
                    g = a.naturalHeight,
                    h = e.width,
                    i = e.height,
                    j = e.x || 0,
                    k = e.y || 0,
                    l = d.getContext("2d");
                b(a) && (f /= 2, g /= 2);
                var m = 1024,
                    n = document.createElement("canvas");
                n.width = n.height = m;
                for (var o = n.getContext("2d"), p = c(a, f, g), q = 0; g > q;) {
                    for (var r = q + m > g ? g - q : m, s = 0; f > s;) {
                        var t = s + m > f ? f - s : m;
                        o.clearRect(0, 0, m, m), o.drawImage(a, -s, -q);
                        var u = s * h / f + j << 0,
                            v = Math.ceil(t * h / f),
                            w = q * i / g / p + k << 0,
                            x = Math.ceil(r * i / g / p);
                        l.drawImage(n, 0, 0, t, r, u, w, v, x), s += m
                    }
                    q += m
                }
                n = o = null
            }

            function b(a) {
                var b = a.naturalWidth,
                    c = a.naturalHeight;
                if (b * c > 1048576) {
                    var d = document.createElement("canvas");
                    d.width = d.height = 1;
                    var e = d.getContext("2d");
                    return e.drawImage(a, -b + 1, 0), 0 === e.getImageData(0, 0, 1, 1).data[3]
                }
                return !1
            }

            function c(a, b, c) {
                var d = document.createElement("canvas");
                d.width = 1, d.height = c;
                var e = d.getContext("2d");
                e.drawImage(a, 0, 0);
                for (var f = e.getImageData(0, 0, 1, c).data, g = 0, h = c, i = c; i > g;) {
                    var j = f[4 * (i - 1) + 3];
                    0 === j ? h = i : g = i, i = h + g >> 1
                }
                d = null;
                var k = i / c;
                return 0 === k ? 1 : k
            }
            return {
                isSubsampled: b,
                renderTo: a
            }
        }), d("moxie/runtime/html5/image/Image", ["moxie/runtime/html5/Runtime", "moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/core/utils/Encode", "moxie/file/Blob", "moxie/runtime/html5/image/ImageInfo", "moxie/runtime/html5/image/MegaPixel", "moxie/core/utils/Mime", "moxie/core/utils/Env"], function (a, b, c, d, e, f, g, h, i) {
            function j() {
                function a() {
                    if (!t && !r) throw new c.ImageError(c.DOMException.INVALID_STATE_ERR);
                    return t || r
                }

                function j(a) {
                    return d.atob(a.substring(a.indexOf("base64,") + 7))
                }

                function k(a, b) {
                    return "data:" + (b || "") + ";base64," + d.btoa(a)
                }

                function l(a) {
                    var b = this;
                    r = new Image, r.onerror = function () {
                        q.call(this), b.trigger("error", new c.ImageError(c.ImageError.WRONG_FORMAT))
                    }, r.onload = function () {
                        b.trigger("load")
                    }, r.src = /^data:[^;]*;base64,/.test(a) ? a : k(a, v.type)
                }

                function m(a, b) {
                    var d, e = this;
                    return window.FileReader ? (d = new FileReader, d.onload = function () {
                        b(this.result)
                    }, d.onerror = function () {
                        e.trigger("error", new c.FileException(c.FileException.NOT_READABLE_ERR))
                    }, d.readAsDataURL(a), void 0) : b(a.getAsDataURL())
                }

                function n(c, d, e, f) {
                    var g, h, i, j, k, l, m, n, q, r = this;
                    if (y = f, q = this.meta && this.meta.tiff && this.meta.tiff.Orientation || 1, -1 !== b.inArray(q, [5, 6, 7, 8])) {
                        var s = c;
                        c = d, d = s
                    }
                    return l = a(), i = e ? Math.max : Math.min, h = i(c / l.width, d / l.height), h > 1 && (!e || f) ? (this.trigger("Resize"), void 0) : (m = Math.round(l.width * h), n = Math.round(l.height * h), t || (t = document.createElement("canvas")), g = t.getContext("2d"), e ? (t.width = c, t.height = d) : (t.width = m, t.height = n), j = m > t.width ? Math.round((m - t.width) / 2) : 0, k = n > t.height ? Math.round((n - t.height) / 2) : 0, y || p(t.width, t.height, q), o.call(this, l, t, -j, -k, m, n), this.width = t.width, this.height = t.height, x = !0, r.trigger("Resize"), void 0)
                }

                function o(a, b, c, d, e, f) {
                    if ("iOS" === i.OS) g.renderTo(a, b, {
                        width: e,
                        height: f,
                        x: c,
                        y: d
                    });
                    else {
                        var h = b.getContext("2d");
                        h.drawImage(a, c, d, e, f)
                    }
                }

                function p(a, b, c) {
                    switch (c) {
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        t.width = b, t.height = a;
                        break;
                    default:
                        t.width = a, t.height = b
                    }
                    var d = t.getContext("2d");
                    switch (c) {
                    case 2:
                        d.translate(a, 0), d.scale(-1, 1);
                        break;
                    case 3:
                        d.translate(a, b), d.rotate(Math.PI);
                        break;
                    case 4:
                        d.translate(0, b), d.scale(1, -1);
                        break;
                    case 5:
                        d.rotate(.5 * Math.PI), d.scale(1, -1);
                        break;
                    case 6:
                        d.rotate(.5 * Math.PI), d.translate(0, -b);
                        break;
                    case 7:
                        d.rotate(.5 * Math.PI), d.translate(a, -b), d.scale(-1, 1);
                        break;
                    case 8:
                        d.rotate(-.5 * Math.PI), d.translate(-a, 0)
                    }
                }

                function q() {
                    s && (s.purge(), s = null), u = r = t = v = null, x = !1
                }
                var r, s, t, u, v, w = this,
                    x = !1,
                    y = !0;
                b.extend(this, {
                    loadFromBlob: function (a) {
                        var b = this,
                            d = b.getRuntime(),
                            e = arguments.length > 1 ? arguments[1] : !0;
                        if (!d.can("access_binary")) throw new c.RuntimeError(c.RuntimeError.NOT_SUPPORTED_ERR);
                        return v = a, a.isDetached() ? (u = a.getSource(), l.call(this, u), void 0) : (m.call(this, a.getSource(), function (a) {
                            e && (u = j(a)), l.call(b, a)
                        }), void 0)
                    }, loadFromImage: function (a, b) {
                        this.meta = a.meta, v = new e(null, {
                            name: a.name,
                            size: a.size,
                            type: a.type
                        }), l.call(this, b ? u = a.getAsBinaryString() : a.getAsDataURL())
                    }, getInfo: function () {
                        var b, c = this.getRuntime();
                        return !s && u && c.can("access_image_binary") && (s = new f(u)), b = {
                            width: a().width || 0,
                            height: a().height || 0,
                            type: v.type || h.getFileMime(v.name),
                            size: u && u.length || v.size || 0,
                            name: v.name || "",
                            meta: s && s.meta || this.meta || {}
                        }
                    }, downsize: function () {
                        n.apply(this, arguments)
                    }, getAsCanvas: function () {
                        return t && (t.id = this.uid + "_canvas"), t
                    }, getAsBlob: function (a, b) {
                        return a !== this.type && n.call(this, this.width, this.height, !1), new e(null, {
                            type: a,
                            data: w.getAsBinaryString.call(this, a, b)
                        })
                    }, getAsDataURL: function (a) {
                        var b = arguments[1] || 90;
                        if (!x) return r.src;
                        if ("image/jpeg" !== a) return t.toDataURL("image/png");
                        try {
                            return t.toDataURL("image/jpeg", b / 100)
                        } catch (c) {
                            return t.toDataURL("image/jpeg")
                        }
                    }, getAsBinaryString: function (a, b) {
                        if (!x) return u || (u = j(w.getAsDataURL(a, b))), u;
                        if ("image/jpeg" !== a) u = j(w.getAsDataURL(a, b));
                        else {
                            var c;
                            b || (b = 90);
                            try {
                                c = t.toDataURL("image/jpeg", b / 100)
                            } catch (d) {
                                c = t.toDataURL("image/jpeg")
                            }
                            u = j(c), s && (u = s.stripHeaders(u), y && (s.meta && s.meta.exif && s.setExif({
                                PixelXDimension: this.width,
                                PixelYDimension: this.height
                            }), u = s.writeHeaders(u)), s.purge(), s = null)
                        }
                        return x = !1, u
                    }, destroy: function () {
                        w = null, q.call(this), this.getRuntime().getShim().removeInstance(this.uid)
                    }
                })
            }
            return a.Image = j
        }), d("moxie/runtime/flash/Runtime", ["moxie/core/utils/Basic", "moxie/core/utils/Env", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/runtime/Runtime"], function (a, b, c, d, e) {
            function f() {
                var a;
                try {
                    a = navigator.plugins["Shockwave Flash"], a = a.description
                } catch (b) {
                    try {
                        a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version")
                    } catch (c) {
                        a = "0.0"
                    }
                }
                return a = a.match(/\d+/g), parseFloat(a[0] + "." + a[1])
            }

            function g(g) {
                var j, k = this;
                g = a.extend({
                    swf_url: b.swf_url
                }, g), e.call(this, g, h, {
                    access_binary: function (a) {
                        return a && "browser" === k.mode
                    }, access_image_binary: function (a) {
                        return a && "browser" === k.mode
                    }, display_media: e.capTrue,
                    do_cors: e.capTrue,
                    drag_and_drop: !1,
                    report_upload_progress: function () {
                        return "client" === k.mode
                    }, resize_image: e.capTrue,
                    return_response_headers: !1,
                    return_response_type: function (b) {
                        return !a.arrayDiff(b, ["", "text", "json", "document"]) || "browser" === k.mode
                    }, return_status_code: function (b) {
                        return "browser" === k.mode || !a.arrayDiff(b, [200, 404])
                    }, select_file: e.capTrue,
                    select_multiple: e.capTrue,
                    send_binary_string: function (a) {
                        return a && "browser" === k.mode
                    }, send_browser_cookies: function (a) {
                        return a && "browser" === k.mode
                    }, send_custom_headers: function (a) {
                        return a && "browser" === k.mode
                    }, send_multipart: e.capTrue,
                    slice_blob: e.capTrue,
                    stream_upload: function (a) {
                        return a && "browser" === k.mode
                    }, summon_file_dialog: !1,
                    upload_filesize: function (b) {
                        return a.parseSizeStr(b) <= 2097152 || "client" === k.mode
                    }, use_http_method: function (b) {
                        return !a.arrayDiff(b, ["GET", "POST"])
                    }
                }, {
                    access_binary: function (a) {
                        return a ? "browser" : "client"
                    }, access_image_binary: function (a) {
                        return a ? "browser" : "client"
                    }, report_upload_progress: function (a) {
                        return a ? "browser" : "client"
                    }, return_response_type: function (b) {
                        return a.arrayDiff(b, ["", "text", "json", "document"]) ? "browser" : ["client", "browser"]
                    }, return_status_code: function (b) {
                        return a.arrayDiff(b, [200, 404]) ? "browser" : ["client", "browser"]
                    }, send_binary_string: function (a) {
                        return a ? "browser" : "client"
                    }, send_browser_cookies: function (a) {
                        return a ? "browser" : "client"
                    }, send_custom_headers: function (a) {
                        return a ? "browser" : "client"
                    }, stream_upload: function (a) {
                        return a ? "client" : "browser"
                    }, upload_filesize: function (b) {
                        return a.parseSizeStr(b) >= 2097152 ? "client" : "browser"
                    }
                }, "client"), f() < 10 && (this.mode = !1), a.extend(this, {
                    getShim: function () {
                        return c.get(this.uid)
                    }, shimExec: function (a, b) {
                        var c = [].slice.call(arguments, 2);
                        return k.getShim().exec(this.uid, a, b, c)
                    }, init: function () {
                        var c, e, f;
                        f = this.getShimContainer(), a.extend(f.style, {
                            position: "absolute",
                            top: "-8px",
                            left: "-8px",
                            width: "9px",
                            height: "9px",
                            overflow: "hidden"
                        }), c = '<object id="' + this.uid + '" type="application/x-shockwave-flash" data="' + g.swf_url + '" ', "IE" === b.browser && (c += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" '), c += 'width="100%" height="100%" style="outline:0"><param name="movie" value="' + g.swf_url + '" /><param name="flashvars" value="uid=' + escape(this.uid) + "&target=" + b.global_event_dispatcher + '" /><param name="wmode" value="transparent" /><param name="allowscriptaccess" value="always" /></object>', "IE" === b.browser ? (e = document.createElement("div"), f.appendChild(e), e.outerHTML = c, e = f = null) : f.innerHTML = c, j = setTimeout(function () {
                            k && !k.initialized && k.trigger("Error", new d.RuntimeError(d.RuntimeError.NOT_INIT_ERR))
                        }, 5e3)
                    }, destroy: function (a) {
                        return function () {
                            a.call(k), clearTimeout(j), g = j = a = k = null
                        }
                    }(this.destroy)
                }, i)
            }
            var h = "flash",
                i = {};
            return e.addConstructor(h, g), i
        }), d("moxie/runtime/flash/file/Blob", ["moxie/runtime/flash/Runtime", "moxie/file/Blob"], function (a, b) {
            var c = {
                slice: function (a, c, d, e) {
                    var f = this.getRuntime();
                    return 0 > c ? c = Math.max(a.size + c, 0) : c > 0 && (c = Math.min(c, a.size)), 0 > d ? d = Math.max(a.size + d, 0) : d > 0 && (d = Math.min(d, a.size)), a = f.shimExec.call(this, "Blob", "slice", c, d, e || ""), a && (a = new b(f.uid, a)), a
                }
            };
            return a.Blob = c
        }), d("moxie/runtime/flash/file/FileInput", ["moxie/runtime/flash/Runtime"], function (a) {
            var b = {
                init: function (a) {
                    this.getRuntime().shimExec.call(this, "FileInput", "init", {
                        name: a.name,
                        accept: a.accept,
                        multiple: a.multiple
                    }), this.trigger("ready")
                }
            };
            return a.FileInput = b
        }), d("moxie/runtime/flash/file/FileReader", ["moxie/runtime/flash/Runtime", "moxie/core/utils/Encode"], function (a, b) {
            function c(a, c) {
                switch (c) {
                case "readAsText":
                    return b.atob(a, "utf8");
                case "readAsBinaryString":
                    return b.atob(a);
                case "readAsDataURL":
                    return a
                }
                return null
            }
            var d = "",
                e = {
                    read: function (a, b) {
                        var e = this,
                            f = e.getRuntime();
                        return "readAsDataURL" === a && (d = "data:" + (b.type || "") + ";base64,"), e.bind("Progress", function (b, e) {
                            e && (d += c(e, a))
                        }), f.shimExec.call(this, "FileReader", "readAsBase64", b.uid)
                    }, getResult: function () {
                        return d
                    }, destroy: function () {
                        d = null
                    }
                };
            return a.FileReader = e
        }), d("moxie/runtime/flash/file/FileReaderSync", ["moxie/runtime/flash/Runtime", "moxie/core/utils/Encode"], function (a, b) {
            function c(a, c) {
                switch (c) {
                case "readAsText":
                    return b.atob(a, "utf8");
                case "readAsBinaryString":
                    return b.atob(a);
                case "readAsDataURL":
                    return a
                }
                return null
            }
            var d = {
                read: function (a, b) {
                    var d, e = this.getRuntime();
                    return (d = e.shimExec.call(this, "FileReaderSync", "readAsBase64", b.uid)) ? ("readAsDataURL" === a && (d = "data:" + (b.type || "") + ";base64," + d), c(d, a, b.type)) : null
                }
            };
            return a.FileReaderSync = d
        }), d("moxie/runtime/flash/xhr/XMLHttpRequest", ["moxie/runtime/flash/Runtime", "moxie/core/utils/Basic", "moxie/file/Blob", "moxie/file/File", "moxie/file/FileReaderSync", "moxie/xhr/FormData", "moxie/runtime/Transporter", "moxie/core/JSON"], function (a, b, c, d, e, f, g, h) {
            var i = {
                send: function (a, d) {
                    function e() {
                        a.transport = k.mode, k.shimExec.call(j, "XMLHttpRequest", "send", a, d)
                    }

                    function h(a, b) {
                        k.shimExec.call(j, "XMLHttpRequest", "appendBlob", a, b.uid), d = null, e()
                    }

                    function i(a, b) {
                        var c = new g;
                        c.bind("TransportingComplete", function () {
                            b(this.result)
                        }), c.transport(a.getSource(), a.type, {
                            ruid: k.uid
                        })
                    }
                    var j = this,
                        k = j.getRuntime();
                    if (b.isEmptyObj(a.headers) || b.each(a.headers, function (a, b) {
                        k.shimExec.call(j, "XMLHttpRequest", "setRequestHeader", b, a.toString())
                    }), d instanceof f) {
                        var l;
                        if (d.each(function (a, b) {
                            a instanceof c ? l = b : k.shimExec.call(j, "XMLHttpRequest", "append", b, a)
                        }), d.hasBlob()) {
                            var m = d.getBlob();
                            m.isDetached() ? i(m, function (a) {
                                m.destroy(), h(l, a)
                            }) : h(l, m)
                        } else d = null, e()
                    } else d instanceof c ? d.isDetached() ? i(d, function (a) {
                        d.destroy(), d = a.uid, e()
                    }) : (d = d.uid, e()) : e()
                }, getResponse: function (a) {
                    var c, f, g = this.getRuntime();
                    if (f = g.shimExec.call(this, "XMLHttpRequest", "getResponseAsBlob")) {
                        if (f = new d(g.uid, f), "blob" === a) return f;
                        if (~b.inArray(a, ["", "text"])) return c = new e, c.readAsText(f);
                        if ("arraybuffer" === a);
                        else if ("json" === a) {
                            c = new e;
                            try {
                                return h(c.readAsText(f))
                            } catch (i) {
                                return null
                            }
                        }
                    }
                    return null
                }, abort: function (a) {
                    var b = this.getRuntime();
                    b.shimExec.call(this, "XMLHttpRequest", "abort"), this.dispatchEvent("readystatechange"), this.dispatchEvent("abort")
                }
            };
            return a.XMLHttpRequest = i
        }), d("moxie/runtime/flash/runtime/Transporter", ["moxie/runtime/flash/Runtime", "moxie/file/Blob"], function (a, b) {
            var c = {
                getAsBlob: function (a) {
                    var c = this.getRuntime(),
                        d = c.shimExec.call(this, "Transporter", "getAsBlob", a);
                    return d ? new b(c.uid, d) : null
                }
            };
            return a.Transporter = c
        }), d("moxie/runtime/flash/image/Image", ["moxie/runtime/flash/Runtime", "moxie/core/utils/Basic", "moxie/runtime/Transporter", "moxie/file/Blob", "moxie/file/FileReaderSync"], function (a, b, c, d, e) {
            var f = {
                loadFromBlob: function (a) {
                    function b(a) {
                        e.shimExec.call(d, "Image", "loadFromBlob", a.uid), d = e = null
                    }
                    var d = this,
                        e = d.getRuntime();
                    if (a.isDetached()) {
                        var f = new c;
                        f.bind("TransportingComplete", function () {
                            b(f.result.getSource())
                        }), f.transport(a.getSource(), a.type, {
                            ruid: e.uid
                        })
                    } else b(a.getSource())
                }, loadFromImage: function (a) {
                    var b = this.getRuntime();
                    return b.shimExec.call(this, "Image", "loadFromImage", a.uid)
                }, getAsBlob: function (a, b) {
                    var c = this.getRuntime(),
                        e = c.shimExec.call(this, "Image", "getAsBlob", a, b);
                    return e ? new d(c.uid, e) : null
                }, getAsDataURL: function () {
                    var a, b = this.getRuntime(),
                        c = b.Image.getAsBlob.apply(this, arguments);
                    return c ? (a = new e, a.readAsDataURL(c)) : null
                }
            };
            return a.Image = f
        }), d("moxie/runtime/silverlight/Runtime", ["moxie/core/utils/Basic", "moxie/core/utils/Env", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/runtime/Runtime"], function (a, b, c, d, e) {
            function f(a) {
                var b, c, d, e, f, g = !1,
                    h = null,
                    i = 0;
                try {
                    try {
                        h = new ActiveXObject("AgControl.AgControl"), h.IsVersionSupported(a) && (g = !0), h = null
                    } catch (j) {
                        var k = navigator.plugins["Silverlight Plug-In"];
                        if (k) {
                            for (b = k.description, "1.0.30226.2" === b && (b = "2.0.30226.2"), c = b.split("."); c.length > 3;) c.pop();
                            for (; c.length < 4;) c.push(0);
                            for (d = a.split("."); d.length > 4;) d.pop();
                            do e = parseInt(d[i], 10), f = parseInt(c[i], 10), i++; while (i < d.length && e === f);
                            f >= e && !isNaN(e) && (g = !0)
                        }
                    }
                } catch (l) {
                    g = !1
                }
                return g
            }

            function g(g) {
                var j, k = this;
                g = a.extend({
                    xap_url: b.xap_url
                }, g), e.call(this, g, h, {
                    access_binary: e.capTrue,
                    access_image_binary: e.capTrue,
                    display_media: e.capTrue,
                    do_cors: e.capTrue,
                    drag_and_drop: !1,
                    report_upload_progress: e.capTrue,
                    resize_image: e.capTrue,
                    return_response_headers: function (a) {
                        return a && "client" === k.mode
                    }, return_response_type: e.capTrue,
                    return_status_code: function (b) {
                        return "client" === k.mode || !a.arrayDiff(b, [200, 404])
                    }, select_file: e.capTrue,
                    select_multiple: e.capTrue,
                    send_binary_string: e.capTrue,
                    send_browser_cookies: function (a) {
                        return a && "browser" === k.mode
                    }, send_custom_headers: function (a) {
                        return a && "client" === k.mode
                    }, send_multipart: e.capTrue,
                    slice_blob: e.capTrue,
                    stream_upload: !0,
                    summon_file_dialog: !1,
                    upload_filesize: e.capTrue,
                    use_http_method: function (b) {
                        return "client" === k.mode || !a.arrayDiff(b, ["GET", "POST"])
                    }
                }, {
                    return_response_headers: function (a) {
                        return a ? "client" : "browser"
                    }, return_status_code: function (b) {
                        return a.arrayDiff(b, [200, 404]) ? "client" : ["client", "browser"]
                    }, send_browser_cookies: function (a) {
                        return a ? "browser" : "client"
                    }, send_custom_headers: function (a) {
                        return a ? "client" : "browser"
                    }, use_http_method: function (b) {
                        return a.arrayDiff(b, ["GET", "POST"]) ? "client" : ["client", "browser"]
                    }
                }), f("2.0.31005.0") && "Opera" !== b.browser || (this.mode = !1), a.extend(this, {
                    getShim: function () {
                        return c.get(this.uid).content.Moxie
                    }, shimExec: function (a, b) {
                        var c = [].slice.call(arguments, 2);
                        return k.getShim().exec(this.uid, a, b, c)
                    }, init: function () {
                        var a;
                        a = this.getShimContainer(), a.innerHTML = '<object id="' + this.uid + '" data="data:application/x-silverlight," type="application/x-silverlight-2" width="100%" height="100%" style="outline:none;"><param name="source" value="' + g.xap_url + '"/><param name="background" value="Transparent"/><param name="windowless" value="true"/><param name="enablehtmlaccess" value="true"/><param name="initParams" value="uid=' + this.uid + ",target=" + b.global_event_dispatcher + '"/></object>', j = setTimeout(function () {
                            k && !k.initialized && k.trigger("Error", new d.RuntimeError(d.RuntimeError.NOT_INIT_ERR))
                        }, "Windows" !== b.OS ? 1e4 : 5e3)
                    }, destroy: function (a) {
                        return function () {
                            a.call(k), clearTimeout(j), g = j = a = k = null
                        }
                    }(this.destroy)
                }, i)
            }
            var h = "silverlight",
                i = {};
            return e.addConstructor(h, g), i
        }), d("moxie/runtime/silverlight/file/Blob", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/file/Blob"], function (a, b, c) {
            return a.Blob = b.extend({}, c)
        }), d("moxie/runtime/silverlight/file/FileInput", ["moxie/runtime/silverlight/Runtime"], function (a) {
            var b = {
                init: function (a) {
                    function b(a) {
                        for (var b = "", c = 0; c < a.length; c++) b += ("" !== b ? "|" : "") + a[c].title + " | *." + a[c].extensions.replace(/,/g, ";*.");
                        return b
                    }
                    this.getRuntime().shimExec.call(this, "FileInput", "init", b(a.accept), a.name, a.multiple), this.trigger("ready")
                }
            };
            return a.FileInput = b
        }), d("moxie/runtime/silverlight/file/FileDrop", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Dom", "moxie/core/utils/Events"], function (a, b, c) {
            var d = {
                init: function () {
                    var a, d = this,
                        e = d.getRuntime();
                    return a = e.getShimContainer(), c.addEvent(a, "dragover", function (a) {
                        a.preventDefault(), a.stopPropagation(), a.dataTransfer.dropEffect = "copy"
                    }, d.uid), c.addEvent(a, "dragenter", function (a) {
                        a.preventDefault();
                        var c = b.get(e.uid).dragEnter(a);
                        c && a.stopPropagation()
                    }, d.uid), c.addEvent(a, "drop", function (a) {
                        a.preventDefault();
                        var c = b.get(e.uid).dragDrop(a);
                        c && a.stopPropagation()
                    }, d.uid), e.shimExec.call(this, "FileDrop", "init")
                }
            };
            return a.FileDrop = d
        }), d("moxie/runtime/silverlight/file/FileReader", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/file/FileReader"], function (a, b, c) {
            return a.FileReader = b.extend({}, c)
        }), d("moxie/runtime/silverlight/file/FileReaderSync", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/file/FileReaderSync"], function (a, b, c) {
            return a.FileReaderSync = b.extend({}, c)
        }), d("moxie/runtime/silverlight/xhr/XMLHttpRequest", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/xhr/XMLHttpRequest"], function (a, b, c) {
            return a.XMLHttpRequest = b.extend({}, c)
        }), d("moxie/runtime/silverlight/runtime/Transporter", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/runtime/Transporter"], function (a, b, c) {
            return a.Transporter = b.extend({}, c)
        }), d("moxie/runtime/silverlight/image/Image", ["moxie/runtime/silverlight/Runtime", "moxie/core/utils/Basic", "moxie/runtime/flash/image/Image"], function (a, b, c) {
            return a.Image = b.extend({}, c)
        }), d("moxie/runtime/html4/Runtime", ["moxie/core/utils/Basic", "moxie/core/Exceptions", "moxie/runtime/Runtime", "moxie/core/utils/Env"], function (a, b, c, d) {
            function e(b) {
                var e = this,
                    h = c.capTest,
                    i = c.capTrue;
                c.call(this, b, f, {
                    access_binary: h(window.FileReader || window.File && File.getAsDataURL),
                    access_image_binary: !1,
                    display_media: h(g.Image && (d.can("create_canvas") || d.can("use_data_uri_over32kb"))),
                    do_cors: !1,
                    drag_and_drop: !1,
                    filter_by_extension: h(function () {
                        return "Chrome" === d.browser && d.version >= 28 || "IE" === d.browser && d.version >= 10
                    }()),
                    resize_image: function () {
                        return g.Image && e.can("access_binary") && d.can("create_canvas")
                    }, report_upload_progress: !1,
                    return_response_headers: !1,
                    return_response_type: function (b) {
                        return !!~a.inArray(b, ["json", "text", "document", ""])
                    }, return_status_code: function (b) {
                        return !a.arrayDiff(b, [200, 404])
                    }, select_file: function () {
                        return d.can("use_fileinput")
                    }, select_multiple: !1,
                    send_binary_string: !1,
                    send_custom_headers: !1,
                    send_multipart: !0,
                    slice_blob: !1,
                    stream_upload: function () {
                        return e.can("select_file")
                    }, summon_file_dialog: h(function () {
                        return "Firefox" === d.browser && d.version >= 4 || "Opera" === d.browser && d.version >= 12 || "IE" === d.browser && d.version >= 10 || !!~a.inArray(d.browser, ["Chrome", "Safari"])
                    }()),
                    upload_filesize: i,
                    use_http_method: function (b) {
                        return !a.arrayDiff(b, ["GET", "POST"])
                    }
                }), a.extend(this, {
                    init: function () {
                        this.trigger("Init")
                    }, destroy: function (a) {
                        return function () {
                            a.call(e), a = e = null
                        }
                    }(this.destroy)
                }), a.extend(this.getShim(), g)
            }
            var f = "html4",
                g = {};
            return c.addConstructor(f, e), g
        }), d("moxie/runtime/html4/file/FileInput", ["moxie/runtime/html4/Runtime", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/utils/Events", "moxie/core/utils/Mime", "moxie/core/utils/Env"], function (a, b, c, d, e, f) {
            function g() {
                function a() {
                    var e, k, l, m, n, o, p = this,
                        q = p.getRuntime();
                    o = b.guid("uid_"), e = q.getShimContainer(), g && (l = c.get(g + "_form"), l && b.extend(l.style, {
                        top: "100%"
                    })), m = document.createElement("form"), m.setAttribute("id", o + "_form"), m.setAttribute("method", "post"), m.setAttribute("enctype", "multipart/form-data"), m.setAttribute("encoding", "multipart/form-data"), b.extend(m.style, {
                        overflow: "hidden",
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }), n = document.createElement("input"), n.setAttribute("id", o), n.setAttribute("type", "file"), n.setAttribute("name", "Filedata"), n.setAttribute("accept", j.join(",")), b.extend(n.style, {
                        fontSize: "999px",
                        opacity: 0
                    }), m.appendChild(n), e.appendChild(m), b.extend(n.style, {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%"
                    }), "IE" === f.browser && f.version < 10 && b.extend(n.style, {
                        filter: "progid:DXImageTransform.Microsoft.Alpha(opacity=0)"
                    }), n.onchange = function () {
                        var b;
                        this.value && (b = this.files ? this.files[0] : {
                            name: this.value
                        }, i = [b], this.onchange = function () {}, a.call(p), p.bind("change", function () {
                            var a, b = c.get(o),
                                d = c.get(o + "_form");
                            p.files.length && b && d && (a = p.files[0], b.setAttribute("id", a.uid), d.setAttribute("id", a.uid + "_form"), d.setAttribute("target", a.uid + "_iframe")), b = d = null
                        }, 998), n = m = null, p.trigger("change"))
                    }, q.can("summon_file_dialog") && (k = c.get(h.browse_button), d.removeEvent(k, "click", p.uid), d.addEvent(k, "click", function (a) {
                        n && !n.disabled && n.click(), a.preventDefault()
                    }, p.uid)), g = o, e = l = k = null, p.trigger({
                        type: "ready",
                        async: !0
                    })
                }
                var g, h, i = [],
                    j = [];
                b.extend(this, {
                    init: function (b) {
                        var f, g = this,
                            i = g.getRuntime();
                        h = b, j = b.accept.mimes || e.extList2mimes(b.accept, i.can("filter_by_extension")), f = i.getShimContainer(),
                            function () {
                                var a, e, h;
                                a = c.get(b.browse_button), i.can("summon_file_dialog") && ("static" === c.getStyle(a, "position") && (a.style.position = "relative"), e = parseInt(c.getStyle(a, "z-index"), 10) || 1, a.style.zIndex = e, f.style.zIndex = e - 1), h = i.can("summon_file_dialog") ? a : f, d.addEvent(h, "mouseover", function () {
                                    g.trigger("mouseenter")
                                }, g.uid), d.addEvent(h, "mouseout", function () {
                                    g.trigger("mouseleave")
                                }, g.uid), d.addEvent(h, "mousedown", function () {
                                    g.trigger("mousedown")
                                }, g.uid), d.addEvent(c.get(b.container), "mouseup", function () {
                                    g.trigger("mouseup")
                                }, g.uid), a = null
                            }(), a.call(this), f = null
                    }, getFiles: function () {
                        return i
                    }, disable: function (a) {
                        var b;
                        (b = c.get(g)) && (b.disabled = !!a)
                    }, destroy: function () {
                        var a = this.getRuntime(),
                            b = a.getShimContainer();
                        d.removeAllEvents(b, this.uid), d.removeAllEvents(h && c.get(h.container), this.uid), d.removeAllEvents(h && c.get(h.browse_button), this.uid), b && (b.innerHTML = ""), g = i = j = h = null
                    }
                })
            }
            return a.FileInput = g
        }), d("moxie/runtime/html4/file/FileReader", ["moxie/runtime/html4/Runtime", "moxie/runtime/html5/file/FileReader"], function (a, b) {
            return a.FileReader = b
        }), d("moxie/runtime/html4/xhr/XMLHttpRequest", ["moxie/runtime/html4/Runtime", "moxie/core/utils/Basic", "moxie/core/utils/Dom", "moxie/core/utils/Url", "moxie/core/Exceptions", "moxie/core/utils/Events", "moxie/file/Blob", "moxie/xhr/FormData", "moxie/core/JSON"], function (a, b, c, d, e, f, g, h, i) {
            function j() {
                function a(a) {
                    var b, d, e, g, h = this,
                        i = !1;
                    if (l) {
                        if (b = l.id.replace(/_iframe$/, ""), d = c.get(b + "_form")) {
                            for (e = d.getElementsByTagName("input"), g = e.length; g--;) switch (e[g].getAttribute("type")) {
                            case "hidden":
                                e[g].parentNode.removeChild(e[g]);
                                break;
                            case "file":
                                i = !0
                            }
                            e = [], i || d.parentNode.removeChild(d), d = null
                        }
                        setTimeout(function () {
                            f.removeEvent(l, "load", h.uid), l.parentNode && l.parentNode.removeChild(l);
                            var b = h.getRuntime().getShimContainer();
                            b.children.length || b.parentNode.removeChild(b), b = l = null, a()
                        }, 1)
                    }
                }
                var j, k, l;
                b.extend(this, {
                    send: function (i, m) {
                        function n() {
                            var c = t.getShimContainer() || document.body,
                                e = document.createElement("div");
                            e.innerHTML = '<iframe id="' + o + '_iframe" name="' + o + '_iframe" src="javascript:&quot;&quot;" style="display:none"></iframe>', l = e.firstChild, c.appendChild(l), f.addEvent(l, "load", function () {
                                var c;
                                try {
                                    c = l.contentWindow.document || l.contentDocument || window.frames[l.id].document, /^4\d{2}\s/.test(c.title) && c.getElementsByTagName("address").length ? j = c.title.replace(/^(\d+).*$/, "$1") : (j = 200, k = b.trim(c.body.innerHTML), s.trigger({
                                        type: "progress",
                                        loaded: k.length,
                                        total: k.length
                                    }), r && s.trigger({
                                        type: "uploadprogress",
                                        loaded: r.size || 1025,
                                        total: r.size || 1025
                                    }))
                                } catch (e) {
                                    if (!d.hasSameOrigin(i.url)) return a.call(s, function () {
                                        s.trigger("error")
                                    }), void 0;
                                    j = 404
                                }
                                a.call(s, function () {
                                    s.trigger("load")
                                })
                            }, s.uid)
                        }
                        var o, p, q, r, s = this,
                            t = s.getRuntime();
                        if (j = k = null, m instanceof h && m.hasBlob()) {
                            if (r = m.getBlob(), o = r.uid, q = c.get(o), p = c.get(o + "_form"), !p) throw new e.DOMException(e.DOMException.NOT_FOUND_ERR)
                        } else o = b.guid("uid_"), p = document.createElement("form"), p.setAttribute("id", o + "_form"), p.setAttribute("method", i.method), p.setAttribute("enctype", "multipart/form-data"), p.setAttribute("encoding", "multipart/form-data"), p.setAttribute("target", o + "_iframe"), t.getShimContainer().appendChild(p);
                        m instanceof h && m.each(function (a, c) {
                            if (a instanceof g) q && q.setAttribute("name", c);
                            else {
                                var d = document.createElement("input");
                                b.extend(d, {
                                    type: "hidden",
                                    name: c,
                                    value: a
                                }), p.appendChild(d)
                            }
                        }), p.setAttribute("action", i.url), n(), p.submit(), s.trigger("loadstart")
                    }, getStatus: function () {
                        return j
                    }, getResponse: function (a) {
                        if ("json" === a && "string" === b.typeOf(k)) try {
                            return i(k.replace(/^\s*<pre[^>]*>/, "").replace(/<\/pre>\s*$/, ""))
                        } catch (c) {
                            return null
                        }
                        return k
                    }, abort: function () {
                        var b = this;
                        l && l.contentWindow && (l.contentWindow.stop ? l.contentWindow.stop() : l.contentWindow.document.execCommand ? l.contentWindow.document.execCommand("Stop") : l.src = "about:blank"), a.call(this, function () {
                            b.dispatchEvent("abort")
                        })
                    }
                })
            }
            return a.XMLHttpRequest = j
        }), d("moxie/runtime/html4/image/Image", ["moxie/runtime/html4/Runtime", "moxie/runtime/html5/image/Image"], function (a, b) {
            return a.Image = b
        }), f(["moxie/core/utils/Basic", "moxie/core/I18n", "moxie/core/utils/Mime", "moxie/core/utils/Env", "moxie/core/utils/Dom", "moxie/core/Exceptions", "moxie/core/EventTarget", "moxie/core/utils/Encode", "moxie/runtime/Runtime", "moxie/runtime/RuntimeClient", "moxie/file/Blob", "moxie/file/File", "moxie/file/FileInput", "moxie/file/FileDrop", "moxie/runtime/RuntimeTarget", "moxie/file/FileReader", "moxie/core/utils/Url", "moxie/file/FileReaderSync", "moxie/xhr/FormData", "moxie/xhr/XMLHttpRequest", "moxie/runtime/Transporter", "moxie/core/JSON", "moxie/image/Image", "moxie/core/utils/Events"])
    }(this),
    function () {
        "use strict";
        var a = {},
            b = moxie.core.utils.Basic.inArray;
        return function c(d) {
            var e, f;
            for (e in d) f = typeof d[e], "object" !== f || ~b(e, ["Exceptions", "Env", "Mime"]) ? "function" === f && (a[e] = d[e]) : c(d[e])
        }(window.moxie), a.Env = window.moxie.core.utils.Env, a.Mime = window.moxie.core.utils.Mime, a.Exceptions = window.moxie.core.Exceptions, window.mOxie = a, window.o || (window.o = a), a
    }(), c.exports = window.mOxie
});