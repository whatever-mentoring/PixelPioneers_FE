import './page3.css';
import { useState } from 'react';


function AppPage4(){
  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  
  const options = ['solo', '2명이서', '3명이서', '4명이서','5명이서','6명이서','그 이상'];
  
  const handleSelect = (item) => {
    setSelectedOption(item);
    setIsActive(false);
  };

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };
  
  

  return (
    <div className="back1">
      <div className="tag3">
        <div className="arrow"></div>
        <h3 className="tag4">포즈 모아보기</h3>
      </div>
      <div className="circle">     
        <button className ="label" onClick={toggleDropdown}>선택하기<svg className="icon1" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.5vh" width="1.5vh" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 011.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" clip-rule="evenodd"></path></svg></button>
        <ul className="submenu">
          <li><a className="optionItem">혼자</a></li>
          <li><a className="optionItem">2명이서</a></li>
          <li><a className="optionItem">3명이서</a></li>
          <li><a className="optionItem">4명이서</a></li>
          <li><a className="optionItem">5명이서</a></li>
          <li><a className="optionItem">6명이서</a></li>
          <li><a className="optionItem">그 이상</a></li>
        </ul>
          
      </div>   

      <div className="block">
        <div className="block1"></div>
        <div className="block2"></div>
        <div className="block3"></div>
        <div className="block4"></div>
        <div className="block5"></div>
        <div className="block6"></div>
        <div className="block7"></div>
        <div className="block8"></div>
        <div className="block9"></div>
        <div className="block10"></div>
      </div>
    </div>    
  )
}
  

export default AppPage4;






/*<div className="circle">
<ul>
<li className="tag5"><a href="#">선택하기</a><svg className="icon1" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.5vh" width="1.5vh" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 011.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" clip-rule="evenodd"></path></svg>
  <ul className="submenu">
    <li><a href="#">혼자</a></li>
    <li><a href="#">2명이서</a></li>
    <li><a href="#">3명이서</a></li>
    <li><a href="#">4명이서</a></li>
    <li><a href="#">5명이서</a></li>
    <li><a href="#">6명이서</a></li>
    <li><a href="#">그 이상</a></li>
  </ul>
</li>
</ul>
</div>
<div class="dropdown">
        <button class="dropbtn">
          <span class="dropbtn_icon">more_horiz</span>
          <span class="dropbtn_content">Select a menu...</span>
          <span class="dropbtn_click" style="font-family: Material Icons; font-size : 16px; color : #3b3b3b; float:right;"
            onclick="dropdown()">arrow_drop_down</span>
        </button>
        <div class="dropdown-content">
          <div class="fastfood" onclick="showMenu(this.innerText)">Burgerking</div>
          <div class="fastfood" onclick="showMenu(this.innerText)">Mcdonals</div>
          <div class="fastfood" onclick="showMenu(this.innerText)">Lotteria</div>
          <div class="fastfood" onclick="showMenu(this.innerText)">Mom's touch</div>
          <div class="fastfood" onclick="showMenu(this.innerText)">In n out</div>
          <div class="fastfood" onclick="showMenu(this.innerText)">Subway</div>
          <div class="fastfood" onclick="showMenu(this.innerText)">Shake shack</div>
        </div>
      </div>
<div class="selectBox2 ">
        <button class="label">선택하기</button>
        <ul class="optionList">
          <li class="optionItem">혼자서</li>
          <li class="optionItem">2명이서</li>
          <li class="optionItem">3명이서</li>
          <li class="optionItem">4명이서</li>
          <li class="optionItem">5명이서</li>
          <li class="optionItem">6명이서</li>
          <li class="optionItem">그 이상</li>
        </ul>
      </div>

<div class="selectBox2">
        <button className="label">선택하기</button>
        <ul className='optionList'>
          <li className='optionItem'>혼자</li>
          <li className='optionItem'>2명이서</li>
          <li className='optionItem'>3명이서</li>
          <li className='optionItem'>4명이서</li>
          <li className='optionItem'>5명이서</li>
          <li className='optionItem'>그 이상</li>
        </ul>
      </div>
<div className="circle">          
        <button class="label">선택하기<svg className="icon1" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.5vh" width="1.5vh" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 011.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" clip-rule="evenodd"></path></svg></button>
        <ul className="submenu">
          <li><a href="#">혼자</a></li>
          <li><a href="#">2명이서</a></li>
          <li><a href="#">3명이서</a></li>
          <li><a href="#">4명이서</a></li>
          <li><a href="#">5명이서</a></li>
          <li><a href="#">6명이서</a></li>
          <li><a href="#">그 이상</a></li>
        </ul>       
      </div>

const label = document.querySelector('.label');
const options = document.querySelectorAll('.optionItem');

// 클릭한 옵션의 텍스트를 라벨 안에 넣음
const handleSelect = (item) => {
  label.parentNode.classList.remove('active');
  label.innerHTML = item.textContent;
}
// 옵션 클릭시 클릭한 옵션을 넘김
options.forEach(option => {
	option.addEventListener('click', () => handleSelect(option))
})

// 라벨을 클릭시 옵션 목록이 열림/닫힘
label.addEventListener('click', () => {
  if(label.parentNode.classList.contains('active')) {
  	label.parentNode.classList.remove('active');
  } else {
  	label.parentNode.classList.add('active');
  }
})



<div className="circle">          
        <button class ="label">선택하기<svg className="icon1" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1.5vh" width="1.5vh" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.022 1.566a1.13 1.13 0 011.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767L7.022 1.566z" clip-rule="evenodd"></path></svg></button>
        <ul className="submenu">
          <li><a href="#">혼자</a></li>
          <li><a href="#">2명이서</a></li>
          <li><a href="#">3명이서</a></li>
          <li><a href="#">4명이서</a></li>
          <li><a href="#">5명이서</a></li>
          <li><a href="#">6명이서</a></li>
          <li><a href="#">그 이상</a></li>
        </ul>       
      </div>
*/