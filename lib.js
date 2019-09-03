var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
var getW = ctx.getWindowManager().getDefaultDisplay().getWidth();
var getH = ctx.getWindowManager().getDefaultDisplay().getHeight();
var Gravity = android.view.Gravity;
var mcAPI = {
    views: {},
    run: function(code) {
        var codee = (typeof code == 'function') ? code : new Function(code);
        ctx.runOnUiThread(function() {
            try {
                codee();
            } catch(e) {
                print("UI线程: " + e.rhinoException);
            }
        });
    },
    PopupWindow: function(obj) {
        obj = obj || {};
        obj.id = obj.id || Math.round(Math.random() * 999999);
        obj.type = "PopupWindow";
        var PopWindow = new android.widget.PopupWindow(ctx);
        if (obj["view"]) PopWindow.setContentView(obj["view"]["view"] || obj.view);
        if (obj["focusable"]) PopWindow.setFocusable(obj["focusable"] || false);
        if (obj["touchable"]) PopWindow.setTouchable(obj["touchable"] || true);
        if (obj["width"]) PopWindow.setWidth(obj.width);
        if (obj["height"]) PopWindow.setHeight(obj.height);
        if (obj["drawable"]) PopWindow.setBackgroundDrawable(new android.graphics.drawable.BitmapDrawable(obj.drawable));
        var da = {
            data: obj,
            view: PopWindow,
            show: function(Position, x, y) {
                PopWindow.showAtLocation(ctx.getWindow().getDecorView(), Position || Gravity.LEFT | Gravity.TOP, x || 0, y || 0);
                return this;
            },
            dismiss: function() {
                PopWindow.dismiss();
                return this;
            }
        };
        this.views[obj.id] = da;
        return da;
    },
    background: function(file, id) {
        var 材质路径 = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack(file));
        var bitImage = new android.graphics.Bitmap.createScaledBitmap(材质路径, getW, getH, false);
        var 布局 = new android.widget.RelativeLayout(ctx);
        var popup = this.PopupWindow({
            id: id,
            view: 布局,
            width: getW,
            height: getH,
            drawable: bitImage
        }).show();
        return popup;
    },
    Button: function(id, a, r, g, b, text, hi, wi, sxzy, sxpy, zypy, zl) {
        var bj = new android.widget.RelativeLayout(ctx);
        var bid = new android.widget.Button(ctx);
        bid.setText(text + "");
        bid.setWidth(dip2px(ctx, hi));
        bid.setHeight(dip2px(ctx, wi));
        bid.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(a, r, g, b)));
        bj.addView(bid);
        bid.setOnClickListener(function(v) {
            (typeof zl == 'function') ? zl() : eval(zl)
        });
        var popup = this.PopupWindow({
            id: id,
            view: bj,
            width: dip2px(ctx, hi),
            height: dip2px(ctx, wi)
        });
        if (sxzy == "sz") {
            popup.show(Gravity.LEFT | Gravity.TOP, zypy, sxpy);
        } else if (sxzy == "sy") {
            popup.show(Gravity.RIGHT | Gravity.TOP, zypy, sxpy);
        } else if (sxzy == "xz") {
            popup.show(Gravity.LEFT | Gravity.BOTTOM, zypy, sxpy);
        } else if (sxzy == "xy") {
            popup.show(Gravity.RIGHT | Gravity.BOTTOM, zypy, sxpy);
        }
    },
    Dialog: function(text, id, title) {
        var imageview = new android.widget.TextView(ctx);
        imageview.setText(text);
        var dialog = new android.app.Dialog(ctx);
        this.views[id] = dialog;
        dialog.setContentView(imageview);
        dialog.setTitle(title);
        dialog.show();
    },
    BitmapButton: function(id, f, hi, wi, sxzy, sxpy, zypy, zl) {
        var bid2 = new android.widget.Button(ctx);
        var bj2 = new android.widget.RelativeLayout(ctx);
        bid2.setWidth(dip2px(ctx, hi));
        bid2.setHeight(dip2px(ctx, wi));
        var pid2 = new android.widget.PopupWindow(ctx);
        var popup = this.PopupWindow({
            id: id,
            view: bj2,
            width: dip2px(ctx, hi),
            height: dip2px(ctx, wi)
        });
        var 材质路径3 = new android.graphics.BitmapFactory.decodeStream(ModPE.openInputStreamFromTexturePack(f));
        var bitImagee = new android.graphics.Bitmap.createScaledBitmap(材质路径3, dip2px(ctx, hi), dip2px(ctx, wi), false);
        bid2.setBackgroundDrawable(android.graphics.drawable.BitmapDrawable(bitImagee));
        bj2.addView(bid2);
        if (sxzy == "sz") {
            popup.show(Gravity.LEFT | Gravity.TOP, zypy, sxpy);
        } else if (sxzy == "sy") {
            popup.show(Gravity.RIGHT | Gravity.TOP, zypy, sxpy);
        } else if (sxzy == "xz") {
            popup.show(Gravity.LEFT | Gravity.BOTTOM, zypy, sxpy);
        } else if (sxzy == "xy") {
            popup.show(Gravity.RIGHT | Gravity.BOTTOM, zypy, sxpy);
        }
        bid2.setOnClickListener(function(v) {
            (typeof zl == 'function') ? zl() : eval(zl)
        });
    },
    MediaPlayer: function(path) {
        var music = new android.media.MediaPlayer();
        music.setDataSource(path);
        this.start = function(loop) {
            music.setLooping(loop || false);
            music.prepare();
            music.start();
            return this;
        }
        this.stop = function() {
            music.stop();
            music.release();
            return this;
        }
    },
    //刚发现可以包装一下的
    ArbitraryAngle: function(n, r, wzpy, lz) {
        var X = Player.getX(),

        Y = Player.getY() - 1.4 + wzpy,

        Z = Player.getZ();
        for (var i = 0; i <= 360; i += 360 / n) {
            var zb = polarToXY(i, r);
            var zb2 = polarToXY(i + 360 / n * 2, r);
            drawLine({
                x: X + zb.x,
                y: Y,
                z: Z + zb.y
            },
            {
                x: X + zb2.x,
                y: Y,
                z: Z + zb2.y
            },
            lz);
        };
    },
    Ground: function(bj, lz) {
        for (var fb = -45; fb < 45; fb++) {

            var cos = Math.cos(fb * Math.PI / 90) * bj

            var sin = Math.sin(fb * Math.PI / 90) * bj

            for (var fa = 0; fa < 180; fa++) {

                var a = Math.sin(fa * Math.PI / 90) * cos

                var b = Math.cos(fa * Math.PI / 90) * cos

                Level.addParticle(lz, Player.getX() + a, Player.getY() + sin, Player.getZ() + b, 0, 0, 0);
            }
        }
    }
};

function dip2px(ctx, dips) {
    return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function drawLine(zb1, zb2, lz) {
    var s = Math.sqrt(Math.pow(zb1.x - zb2.x, 2) + Math.pow(zb1.y - zb2.y, 2) + Math.pow(zb1.z - zb2.z, 2));
    for (var e = 0; e <= s; e = e + 0.1) {
        var X = zb1.x + (zb2.x - zb1.x) / s * e;
        var Y = zb1.y + (zb2.y - zb1.y) / s * e;
        var Z = zb1.z + (zb2.z - zb1.z) / s * e;
        Level.addParticle(lz, X, Y, Z, 0, 0, 0, 1000);
    }
};

function polarToXY(i, p) {
    var r = i * Math.PI / 180;
    return {
        x: p * Math.cos(r),
        y: p * Math.sin(r)
    };
}
module.exports = mcAPI;