const version = '2.9.1';
const ORIGINAL_THEME = '#03AF67'; // default color
let chalk = '';
const themeColor = '#1890FF';
const getThemeCluster = theme => {
    const tintColor = (color, tint) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);
        if (tint === 0) {
            // when primary color is in its rgb space
            return [red, green, blue].join(',');
        } else {
            red += Math.round(tint * (255 - red));
            green += Math.round(tint * (255 - green));
            blue += Math.round(tint * (255 - blue));
            red = red.toString(16);
            green = green.toString(16);
            blue = blue.toString(16);
            return `#${red}${green}${blue}`;
        }
    };

    const shadeColor = (color, shade) => {
        let red = parseInt(color.slice(0, 2), 16);
        let green = parseInt(color.slice(2, 4), 16);
        let blue = parseInt(color.slice(4, 6), 16);
        red = Math.round((1 - shade) * red);
        green = Math.round((1 - shade) * green);
        blue = Math.round((1 - shade) * blue);
        red = red.toString(16);
        green = green.toString(16);
        blue = blue.toString(16);
        return `#${red}${green}${blue}`;
    };
    const clusters = [theme];
    console.log('theme', theme);
    for (let i = 0; i <= 9; i++) {
        console.log('tintColo', tintColor(theme, Number((i / 10).toFixed(2))));
        clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
    }
    clusters.push(shadeColor(theme, 0.1));
    return clusters;
};
const updateStyle = (style, oldCluster, newCluster) => {
    let newStyle = style;
    oldCluster.forEach((color, index) => {
        newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
    });
    return newStyle;
};

const getCSSString = url => {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                const style = xhr.responseText;
                resolve(style);
            }
        };
        xhr.open('GET', url);
        xhr.send();
    });
};
const theme = async function(val) {
    // const oldVal = chalk ? themeColor : ORIGINAL_THEME;

    const themeCluster = getThemeCluster(themeColor.replace('#', ''));
    // const originalCluster = getThemeCluster(oldVal.replace('#', ''));
    const getHandler = (variable, id) => {
        return () => {
            const originalCluster = getThemeCluster(
                ORIGINAL_THEME.replace('#', '')
            );
            const newStyle = updateStyle(
                variable,
                originalCluster,
                themeCluster
            );

            let styleTag = document.getElementById(id);
            if (!styleTag) {
                styleTag = document.createElement('style');
                styleTag.setAttribute('id', id);
                document.head.appendChild(styleTag);
            }
            styleTag.innerText = newStyle;
        };
    };
    if (!chalk) {
        const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
        chalk = await getCSSString(url);
    }
    const chalkHandler = getHandler(chalk, 'chalk-style');
    chalkHandler();
};

theme('#03AF67');

// export default theme;
