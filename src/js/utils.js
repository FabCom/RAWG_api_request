import Linux_logo from '../assets/images/logos/linux.svg'
import Mobile_logo from '../assets/images/logos/mobile.svg'
import Ps4_logo from '../assets/images/logos/ps4.svg'
import Switch_logo from '../assets/images/logos/switch.svg'
import Windows_logo from '../assets/images/logos/windows.svg'
import Xbox_logo from '../assets/images/logos/xbox.svg'

export function platformLinks(platforms,platforms_div){

  if (platforms.includes('Linux')){
    let image = new Image(22);
    image.src = Linux_logo;
    platforms_div.appendChild(image)
  }
  if (platforms.includes('Android') || platforms.includes('ios')){
    let image = new Image(18);
    image.src = Mobile_logo;
    platforms_div.appendChild(image)
  }
  if (platforms.includes('PC')){
    let image = new Image(22);
    image.src = Windows_logo;
    platforms_div.appendChild(image)
  }
  if (platforms.includes('Switch')){
    let image = new Image(22);
    image.src = Switch_logo;
    platforms_div.appendChild(image)
  }
  if (platforms.includes('Xbox')){
    let image = new Image(22);
    image.src = Xbox_logo;
    platforms_div.appendChild(image)
  }
  if (platforms.includes('PlayStation')){
    let image = new Image(22);
    image.src = Ps4_logo;
    platforms_div.appendChild(image)
  }

}