// ---------------------------------- Configuration ---------------------------------------

const storeName         = 'My-Store';
const desktopLayout     ='wid=DesktopId'
const mobileLayout      ='wid=MobileId'
const vtex              = 'app/dist';
const folders           = '{desktop,mobile,shared}';
const scriptsWatch      = `app/src/${folders}/js/**/*.js`;
const scripts           = `app/src/${folders}/js/*.js`;
const styles            = `app/src/${folders}/sass/**/*.scss`;
const sprites           = 'app/assets/sprites/**/*.png';
const vuefiles          = `app/src/${folders}/vue/modules/components vue/*.vue`;
const vuescripts        = `app/src/${folders}/vue/*.js`;
const vueScriptsWatch   = `app/src/${folders}/vue/**/*.js`;
const vueFilesWatch     = `app/src/${folders}/vue/**/*.vue`;
// ------------------------------------- Modules -------------------------------------------

const gulp              = require('gulp');
const sass              = require('gulp-sass');
const autoprefixer      = require('autoprefixer');
const postcss           = require('gulp-postcss');
const cssnano           = require('cssnano');
const uglify            = require('gulp-uglify');
const browserify        = require('browserify');
const babelify          = require('babelify');
const source            = require('vinyl-source-stream');
const buffer            = require('vinyl-buffer');
const glob              = require('glob');
const stream            = require('event-stream');
const del               = require('del');
const browserSync       = require("browser-sync").create();
const spritesmith       = require('gulp.spritesmith');
const vueComponent      = require('gulp-vue-single-file-component');
const rename            = require('gulp-rename');
// ------------------------------------ Development ---------------------------------------

function syncDesk() {
    browserSync.init({
        open: "external",
        https: true,
        ui: false,
        host: storeName + '.vtexlocal.com.br',
        startpath: '/admin/login/',
        proxy: `https://${storeName}.vtexcommercestable.com.br?${desktopLayout}`,
        serveStatic: [{
            route: '/arquivos',
            dir: [vtex]
        }]
    })
}

function syncMobile() {
    browserSync.init({
        open: "external",
        https: true,
        ui: false,
        host: storeName + '.vtexlocal.com.br',
        startpath: '/admin/login/',
        proxy: `https://${storeName}.vtexcommercestable.com.br?${mobileLayout}`,
        serveStatic: [{
            route: '/arquivos',
            dir: [vtex]
        }]
    })
}

function sync() {
    browserSync.init({
        open: "external",
        https: true,
        ui: false,
        online : true,
        host: storeName + '.vtexlocal.com.br',
        startpath: '/admin/login/',
        proxy: 'https://' + storeName + '.vtexcommercestable.com.br',
        serveStatic: [{
            route: '/arquivos',
            dir: [vtex]
        }]
    })
}

function sprite() {
    return gulp.src(sprites)
        .pipe(spritesmith({
            imgName: 'sprite.png',
            cssName: 'sprite.css'
        }))
        .pipe(gulp.dest('app/dist'));
}


function scss() {
    return glob(styles, function (err, folder) {
        return gulp.src(folder)
            .pipe(sass())
            .pipe(gulp.dest(vtex))
            .pipe(browserSync.stream())
    });
};

function babel(done) {
    return glob(scripts, function (err, folder) {
        if (err) done(err);
        let files = folder.map((file) => file.split('js/')[1])
        let tasks = folder.map(function (entry, i) {
            return browserify(entry)
                .transform(babelify, { presets: ["@babel/preset-env"] })
                .bundle()
                .pipe(source(files[i]))
                .pipe(buffer())
                .pipe(gulp.dest(vtex));
        });
        stream.merge(tasks).on('end', done);
    });
};

function watch() {
    gulp.watch(styles, scss);
    gulp.watch(scriptsWatch, babel).on('change', browserSync.reload);
}
// ------------------------------------- Production ---------------------------------------

function css(done) {
    return glob(styles, function (err, folder) {
        if (err) done(err);
        let builds = folder.map((file) => file.split(storeName)[0].replace('src', 'dist').replace('sass', 'css'))
        let tasks = folder.map(function (entry, index) {
            return gulp.src(entry)
                .pipe(sass())
                .pipe(postcss([
                    autoprefixer(),
                    cssnano()
                ]))
                .pipe(gulp.dest(builds[index]))
        });
        stream.merge(tasks).on('end', done);
    });
};


function js(done) {
    return glob(scripts, function (err, folder) {
        if (err) done(err);
        let files = folder.map((file) => file.split('js/')[1])
        let builds = folder.map((file) => file.split(storeName)[0].replace('src', 'dist'))

        let tasks = folder.map(function (entry, i) {
    
            return browserify(entry)
                .transform(babelify, { presets: ["@babel/preset-env"] })
                .bundle()
                .pipe(source(files[i]))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(gulp.dest(builds[i]));
        });
        stream.merge(tasks).on('end', done);
    });
};

function clean() {
    return del(['app/dist'],{force:true});
}
// -------------------------------------  Vue  ---------------------------------------
function vueify(done) {
    return glob(vuefiles,  (err, folder) =>{
        let tasks = folder.map((file) => {
            let builds = file.split(' vue')[0]
            return gulp.src(file)
            .pipe(vueComponent())
            .pipe(rename({ extname: '.js' }))
            .pipe(gulp.dest(builds))
        })
        stream.merge(tasks).on('end', done);
    });
}

function vueBabel(done) {
    return glob(vuescripts, function (err, folder) {
        if (err) done(err);
        let files = folder.map((file) => file.split('vue/')[1])
        let tasks = folder.map(function (entry, i) {
            return browserify(entry)
                .transform(babelify, { 
                    presets : ["@babel/preset-env"],
                    plugins : ["@babel/plugin-syntax-async-generators"]
                 })
                .bundle()
                .pipe(source(files[i]))
                .pipe(buffer())
                .pipe(gulp.dest(vtex));
        });
        stream.merge(tasks).on('end', done);
    });
};

function vueJs(done) {
    return glob(vuescripts, function (err, folder) {
        if (err) done(err);
        let files = folder.map((file) => file.split('vue/')[1])
        let builds = folder.map((file) => file.split(storeName)[0].replace('src', 'dist'))

        let tasks = folder.map(function (entry, i) {
            return browserify(entry)
                .transform(babelify, { 
                    presets : ["@babel/preset-env"],
                    plugins : ["@babel/plugin-syntax-async-generators","@babel/plugin-proposal-async-generator-functions"]
                 })
                .bundle()
                .pipe(source(files[i]))
                .pipe(buffer())
                .pipe(uglify())
                .pipe(gulp.dest(builds[i]));
        });
        stream.merge(tasks).on('end', done);
    });
};

function vueWatch() {
    gulp.watch(styles, scss);
    gulp.watch(vueScriptsWatch, vueBabel).on('change', browserSync.reload);
    gulp.watch(vueFilesWatch, vueify)
}

// ------------------------------------- Tasks ---------------------------------------

const devDesk = gulp.series(clean, gulp.parallel(syncDesk, scss, babel, watch));
exports.desk = devDesk;

const devMobile = gulp.series(clean, gulp.parallel(syncMobile, scss, babel, watch));
exports.mobile = devMobile;

const dev = gulp.series(clean, gulp.parallel(sync, scss, babel, watch));
exports.watch = dev;

const vueDev = gulp.series(clean,vueify,gulp.parallel(sync, scss, vueBabel , vueWatch));
exports.vue = vueDev;

const prod = gulp.series(clean, gulp.parallel(css, js));
exports.default = prod;

const vueProd = gulp.series(clean,vueify,gulp.parallel(css,vueJs));
exports.vueBuild = vueProd;

const smith = gulp.series(clean, gulp.parallel(sprite));
exports.sprite = smith;