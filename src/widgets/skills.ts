import buildCard from '../components/card'
import buildGradientBox from '../components/gradient-box'
import { findData } from '../utils'
import errorWidget from './error'
import languageData from '../data/languages'

export default function skillsWidget(
    skillsString: string,
    includeNames: boolean
): string {
    const skillList: Array<string> = skillsString.split(',')

    if (skillList === undefined) {
        return errorWidget('Skills', '-24%', 'Languages are undefined!', '-28%')
    }

    const width = 812
    const height =
        344 +
        114 * Math.floor((skillList.length - 0.1) / 7) +
        (includeNames ? (Math.floor((skillList.length - 0.1) / 7) + 1) * 25 : 0)

    function getBoxes() {
        let boxes = ''
        for (let i = 0; i < skillList.length; i++) {
            let foundData = findData(languageData, skillList[i])
            if (foundData === undefined) {
                foundData = {
                    name: [''],
                    colorFrom: '#FFFFFF',
                    colorTo: '#808080',
                    icon: 'undefined',
                    width: -1,
                    height: -1,
                    xOffset: 0,
                }
            }

            const row = Math.floor(i / 7)
            const transX = 102 * (i - row * 7)
            const transY = 114 * row + (includeNames && row > 0 ? 25 * row : 0)

            boxes += buildGradientBox(
                i,
                foundData.colorFrom,
                foundData.colorTo,
                transX,
                transY
            )

            boxes +=
                foundData.icon != 'Undefined'
                    ? `<g transform="translate(${
                          transX + (80 - foundData.width) / 2
                      } ${transY + (80 - foundData.height) / 2})">` +
                      foundData.icon +
                      '</g>'
                    : ''

            if (includeNames) {
                boxes += `<g id="header-text" transform="translate(${
                    transX +
                    (80 - foundData.name[0].length * 7.5) / 2.3 +
                    foundData.xOffset
                } ${60 + 140 * row})">
                    <text id="skills" fill="${
                        foundData.colorTo
                    }" transform="translate(0 44)" font-size="16" font-family="Roboto-Light, Roboto, sans-serif" font-weight="300">
                        <tspan x="0" y="0">${foundData.name[0]}</tspan>
                    </text>
                </g>`
            }
        }
        return boxes
    }

    return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
    xmlns="http://www.w3.org/2000/svg">
        ${buildCard(width, height, '#18191A')}
        <g id="header-text" transform="translate(60 60)">
            <text id="skills" transform="translate(0 44)" fill="#E4E6EB" font-size="42" font-family="Roboto-Medium, Roboto, sans-serif" font-weight="500">
                <tspan x="0" y="0">Skills</tspan>
            </text>
            <text id="languages" transform="translate(0 83)" fill="#bfbfbf" font-size="24" font-family="Roboto-Regular, Roboto, sans-serif">
                <tspan x="0" y="0">Languages</tspan>
            </text>
        </g>
        <g id="boxes" transform="translate(60 184)">
            ${getBoxes()}
        </g>
    </svg>
  `
}
