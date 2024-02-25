import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { hamburgerMenu } from '../components/hamburgerMenu';
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { IconContext } from 'react-icons';
import { BsFillArrowRightSquareFill } from "react-icons/bs";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import ThirdNavbarMenu from '../components/ThirdNavbarMenu';
import CarListing from '../components/CarListing';
import CarMake from '../components/CarMake';
import CarPrice from '../components/CarPrice';
import CarYear from '../components/CarYear';
import CarMileage from '../components/CarMileage';
import { cars, routeMapping } from '../components/carConstants';
import './HomePage.css';
import { usePostContext } from '../hooks/usePostContext';


const HomeIndex = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const [makeDropdown, setMakeDropdown] = useState(false);
  const [modelDropdown, setModelDropdown] = useState(false);
  const [yearsDropdown, setYearsDropdown] = useState(false);
  const [priceDropdown, setPriceDropdown] = useState(false);
  const [mileageDropdown, setMileageDropdown] = useState(false);

  const toggleDropdown = (dropdownType) => {
    switch (dropdownType) {
      case 'make':
        setMakeDropdown(!makeDropdown);
        break;
      case 'model':
        setModelDropdown(!modelDropdown);
        break;
      case 'years':
        setYearsDropdown(!yearsDropdown);
        break;
      case 'price':
        setPriceDropdown(!priceDropdown);
        break;
      case 'mileage':
        setMileageDropdown(!mileageDropdown);
        break;
      default:
        break;
    }
  };
  const [checkedMakes, setCheckedMakes] = useState([]);
  const [checkedModels, setCheckedModels] = useState([]);
  const [checkedYears, setCheckedYears] = useState([]);
  const [checkedPrices, setCheckedPrices] = useState([]);
  const [checkedMileages, setCheckedMileages] = useState([]);

  // Car model function
  

  const [filteredResults, setFilteredResults] = useState({});
  const [filteredModelResults, setFilteredModelResults] = useState({});
  const [showModelOptions, setShowModelOptions] = useState(false);

  const handleCheckboxClick = (value, isMake) => {
    if (isMake) {
      setCheckedMakes((prevCheckedMakes) => {
        if (prevCheckedMakes.includes(value)) {
          return prevCheckedMakes.filter((make) => make !== value);
        } else {
          return [...prevCheckedMakes, value];
        }
      });
    } else {
      setCheckedModels((prevCheckedModels) => {
        if (prevCheckedModels.includes(value)) {
          return prevCheckedModels.filter((model) => model !== value);
        } else {
          return [...prevCheckedModels, value];
        }
      });
    }
  };

  const handleSearchClick = () => {
    const newFilteredResults = {};

    checkedMakes.forEach((selectedMake) => {
      // Filter the cars based on the selected make
      const result = cars.filter((car) => car.make === selectedMake);
      newFilteredResults[selectedMake] = result;
    });

    setFilteredResults(newFilteredResults);
    setShowModelOptions(true); // Show model options after search

    console.log('Search button clicked:', newFilteredResults);
  };

  const handleClearClick = () => {
    setCheckedMakes([]);
    setFilteredResults({});
    setShowModelOptions(false); // Hide model options on clear
  };

  const handleModelSearchClick = () => {
    const newFilteredModelResults = {};

    checkedModels.forEach((selectedModel) => {
      // Filter the cars based on the selected model
      const result = cars.filter((car) => car.model === selectedModel);
      newFilteredModelResults[selectedModel] = result;
    });

    setFilteredModelResults(newFilteredModelResults);

    console.log('Model Search button clicked:', newFilteredModelResults);
  };

  const handleModelClearClick = () => {
    setCheckedModels([]);
    setFilteredModelResults({});
  };

  const modelOptions = ['Toyota', 'Honda', 'BMW', 'Tesla', 'Chevrolet', 'Ford'];

  // Car make function
  const [makelOptions, setMakeOptions] = useState([]);
  const [checkedMake, setCheckedMake] = useState([]);
  const [filteredMakeResults, setFilteredMakeResults] = useState({});

  const handleMakeCheckboxClick = (value) => {
    setCheckedMake((prevCheckedMake) => {
      if (prevCheckedMake.includes(value)) {
        return prevCheckedMake.filter((make) => make !== value);
      } else {
        return [...prevCheckedMake, value];
      }
    });
  };
  
  const handleMakeSearchClick = () => {
    const newFilteredMakeResults = {};
  
    checkedMakes.forEach((selectedMake) => {
      // Filter the cars based on the selected make
      const result = cars.filter((car) => car.make === selectedMake);
      newFilteredMakeResults[selectedMake] = result;
    });
  
    setFilteredMakeResults(newFilteredMakeResults);
  
    console.log('Make Search button clicked:', newFilteredMakeResults);
  };
  
  const handleMakeClearClick = () => {
    setCheckedMake([]);
    setFilteredMakeResults({});
  };
  
  const makeOptions = ['Toyota', 'Honda', 'BMW', 'Tesla', 'Chevrolet', 'Ford'];
  

  // Years function
  const handleYearCheckboxClick = (year) => {
    setCheckedYears((prevCheckedYears) => {
      if (prevCheckedYears.includes(year)) {
        return prevCheckedYears.filter((selectedYear) => selectedYear !== year);
      } else {
        return [...prevCheckedYears, year];
      }
    });
  };
  
  const handleYearClearClick = () => {
    setCheckedYears([]);
  };

  // Price function
  const handlePriceCheckboxClick = (price) => {
    setCheckedPrices((prevCheckedPrices) => {
      if (prevCheckedPrices.includes(price)) {
        return prevCheckedPrices.filter((selectedPrice) => selectedPrice !== price);
      } else {
        return [...prevCheckedPrices, price];
      }
    });
  };

  const handlePricesClearClick = () => {
    setCheckedPrices([]);
  };

  // Mileage function
  const handleMileageCheckboxClick = (mileage) => {
    setCheckedMileages((prevCheckedMileages) => {
      if (prevCheckedMileages.includes(mileage)) {
        return prevCheckedMileages.filter((selectedMileage) => selectedMileage !== mileage);
      } else {
        return [...prevCheckedMileages, mileage];
      }
    });
  };

  const handleMileageClearClick = () => {
    setCheckedMileages([]);
  };



  // Function to handle keyup event
  const myFunction = () => {
    const searchInput = document.getElementById('mySearch').value.toLowerCase();
    const items = document.querySelectorAll('.dropdown-content .model-label');

    items.forEach((item) => {
      const text = item.textContent.toLowerCase();

      if (text.includes(searchInput)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  };


<<<<<<< HEAD
    //2 options:
    //1- Set post.id in webpage, transfer webpages. Currently, too many renders so it fails
    //2- Have post details be a pop-up since data is already all here. 
    const [viewingPost, setViewingPost] = useState(false);
    const [currentPost, setCurrentPost] = useState(-1);
    const [currentPostId, setCurrentPostId] = useState(-1);

    const handlePostBoxClick = (post, id) =>{

      if(viewingPost == false){     //This was for a pop-up feature. Still can be useful later
        //setCurrentPost(post);
        //setViewingPost(true);
      }
      else if (viewingPost == true){
        //setCurrentPost(-1);
        //setViewingPost(false);
      }
      
      //This is for changing the webpage to a unique one and passing the post.id through url
      setCurrentPostId(id);
      var href = "/CarInfo/" + id;
      window.location=href;
=======
    //Saving post document so it can be called in "CarInfo" page
    //-Nick
    const handlePostBoxClick = (id) =>{
      if(id == undefined){
        id = -1;
      }
      //Not ideal solution but having trouble with URL method
      localStorage.setItem("post",id);
>>>>>>> main
    }
  
    //Pulling and Showing Posts from Database Section
  
    const {posts, dispatch} = usePostContext()
  
<<<<<<< HEAD
    //Might be efficient if this only occured on refresh instead of always
    //Need to limit how many get pulled with it getting more when it reaches bottom of screen or by clicking next page
=======
>>>>>>> main
    useEffect(() => {
      const fetchPosts = async () => {
        const response = await fetch('/api/postRoutes')
        const json = await response.json()
  
        if(response.ok){
          console.log('response Ok')
          dispatch({type: 'SET_POSTS', payload: json})
        }
      }
      
      fetchPosts()
<<<<<<< HEAD
    }, [])
    //DO NOT REMOVE THE BRACKETS, empty dependancy array as a 2nd arg runs useEffect hook only once when component renders
    //Will run hook again when page refreshes
  

=======
    })
  
  
  


>>>>>>> main
  return (
    <section>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbarMenu'>
          <Link to="#" className='hamburger-bars'>
            <FaBars onClick={showSidebar} />
          </Link>

          <div className="carmony-logo">
            <img src="CARMONY_ICON2.png" alt="" />
          </div>

          <ThirdNavbarMenu />
        </div>

        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className='hamburger-bars'>
                <AiOutlineClose />
              </Link>
            </li>
            {hamburgerMenu.map((item, index) => {
                return (
                    <li key={index} className={item.cName}>
                        <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                        </Link>
                    </li>
                );
            })}
          </ul>
        </nav>
      </IconContext.Provider>

      <div className="filter-container">
        <div className="filter-box">
          <div className="side-bar">
            <div className="filter-search">
              <div className="filter-header">
                <h1>Filter by</h1>
                <a href="#">
                  <h3>clear filter</h3>
                </a>
              </div>
            </div>

            <CarListing />
           
            <div className="myMenu">
              <div className="customer-choices">
                <div className="choices">
                  <Link to="#"><h3>All</h3></Link>
                  <Link to="#"><h3>Dealers</h3></Link>
                  <Link to="#"><h3>Owners</h3></Link>
                </div>
              </div>

              <div className="dropdown-section">
                <li>
                  <div className="arrow-container">
                    <h3 onClick={() => toggleDropdown('model')}>
                      <p>Model</p>
                      {modelDropdown ? <FaAngleUp className="arrow-icon" /> : <FaAngleDown className="arrow-icon" />}
                    </h3>
                  </div>
                  {modelDropdown && (
                    <div className="dropdown-content">
                      <div>
                      {modelOptions.map((model) => {
                        const make = cars.find((car) => car.model === model)?.make || '';
                        return (
                          <div key={model}>
                            <label htmlFor={model} className="model-label">
                              <input
                                type="checkbox"
                                id={model}
                                value={model}
                                checked={checkedMakes.includes(model)}
                                onChange={() => handleCheckboxClick(model, true)}
                                style={{ marginRight: '5px' }}
                              />
                              <span>{model}</span>
                            </label>
                            {filteredResults[model] && (
                              <div className="filtered-results">
                                <div>
                                  <ul>
                                    {filteredResults[model].map((car, index) => (
                                      <li key={index}>
                                        {car.model in routeMapping ? (
                                          <Link to={routeMapping[car.model]}>{`${car.make} ${car.model}`}</Link>
                                        ) : null}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                            <carComponent make={make} model={model} />
                          </div>
                        );
                      })}
                        <div className='search'>
                          <button onClick={handleSearchClick} style={{ marginLeft: '10px' }}>
                            <p>Search</p>
                          </button>
                          <button onClick={handleClearClick} style={{ marginLeft: '10px' }}>
                            <p>Clear</p>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </li>

                <CarMake
                  makeOptions={makeOptions}
                  checkedMake={checkedMake}
                  handleMakeCheckboxClick={handleMakeCheckboxClick}
                  handleMakeSearchClick={handleMakeSearchClick}
                  handleMakeClearClick={handleMakeClearClick}
                  makeDropdown={makeDropdown}
                  toggleDropdown={toggleDropdown}

                />

                <CarYear
                  checkedYears={checkedYears}
                  handleYearCheckboxClick={handleYearCheckboxClick}
                  handleYearClearClick={handleYearClearClick}
                  yearsDropdown={yearsDropdown}
                  toggleDropdown={toggleDropdown}
                />

                <CarPrice
                  checkedPrices={checkedPrices}
                  handlePriceCheckboxClick={handlePriceCheckboxClick}
                  handlePricesClearClick={handlePricesClearClick}
                  priceDropdown={priceDropdown}
                  toggleDropdown={toggleDropdown}
                />

                <CarMileage
                  checkedMileages={checkedMileages}
                  handleMileageCheckboxClick={handleMileageCheckboxClick}
                  handleMileageClearClick={handleMileageClearClick}
                  mileageDropdown={mileageDropdown}
                  toggleDropdown={toggleDropdown}
                />

              </div>
            </div>
          </div>


           {/* Infinite Get Requests, whoops, probably bc of fetch() or backend server.js*/}
          <div className="container">
            <div className="products-con">

<<<<<<< HEAD
              {/* Start Posting Box */}
              
              {/* Basically a For each loop */}
              {/* We want to see many posts*/}
              { !viewingPost && posts && posts.map((post) =>(
            /*  <span>{ setUrl("/post-details" + post.id)} </span><a href={url} onClick={() => { handlePostBoxClick() }}>  too many rerenders*/
            /*  <button href="" onClick={() => { handlePostBoxClick() }}> */
               <div className="test2" key={post.id}> 
                  <a onClick={() => { handlePostBoxClick(post, post._id) }}>
                      <div className='products-item'>
                        <div className='products-img'>
                        { /* Need to be able to pull image from DB */ }
                          <img
                          src="https://images.offerup.com/4uQVF_BU-_3APQkmUNUmGB3xqhE=/1280x960/d3ed/d3ed001efeac469097afcb8638e4ca76.jpg"
                          alt="Picture Failure"
                          />
                        </div>
                      
                        <div className='products-detail'>
                          <h3>{post.year} {post.make} {post.model}</h3>
                        </div>
                        <div className='products-price'>
                          <div className='products-left'>
                            <h3>${post.price}</h3>
                          </div> 
                        </div>
                        <div className='meleage-city'>
                          <div className='mileage'>
                            <div className='mileage-left'>
                              <div className='mile-image'>
                                <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                              </div>
                              <h4>{/*post.mileage*/} Miles</h4>
                            </div>
                          </div>
                          <div className='city'>
                            <div className='city-right'>
                              <h4>{post.location}</h4>
                            </div>
=======
              {/*{ posts ? 'Posts' : 'No Posts'}*/}
              {/* Start Posting Box */}
              
              {/* Basically a For each loop */}
              {posts && posts.map((post) =>(

                <a href="/Post" onClick={() => { handlePostBoxClick(post.postID) }}>
                  <div className="test2" key={post.id}>

                    <div className='products-item'>
                      <div className='products-img'>
                      { /* Need to be able to pull image from DB */ }
                        <img
                        src="https://images.offerup.com/4uQVF_BU-_3APQkmUNUmGB3xqhE=/1280x960/d3ed/d3ed001efeac469097afcb8638e4ca76.jpg"
                        alt="Picture Failure"
                        />
                      </div>
                    
                      <div className='products-detail'>
                        <h3>{post.year} {post.make} {post.model}</h3>
                      </div>
                      <div className='products-price'>
                        <div className='products-left'>
                          <h3>${post.price}</h3>
                        </div> 
                      </div>
                      <div className='meleage-city'>
                        <div className='mileage'>
                          <div className='mileage-left'>
                            <div className='mile-image'>
                              <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                            </div>
                            <h4>{post.mileage} Miles</h4>
                          </div>
                        </div>
                        <div className='city'>
                          <div className='city-right'>
                            <h4>{post.location}</h4>
>>>>>>> main
                          </div>
                        </div>
                      </div>
                    
<<<<<<< HEAD
                  </a>
                </div>
                ))}

                {/* We have clicked on a post and want to see 1 post */}
                { viewingPost && (
                    <div className='viewPostClickableArea' onClick={() => { handlePostBoxClick() }}>
                      <div className='viewPostTextDisplay'>
                        Viewing a Post
                        <div>
                          YMM: {currentPost.year} {currentPost.make} {currentPost.model}
                        </div>
                        <div>
                          Price: {currentPost.price}
                        </div>
                      </div>
                    </div>
                )}
                
                {/* End Posting Box */}

 
                

              {/*<a href="CarInfo">
=======
                    </div>
                  </div> 
                  
                </a>
                ))}
                {/* End Posting Box */}


                

              <a href="CarInfo">
>>>>>>> main
              <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/4uQVF_BU-_3APQkmUNUmGB3xqhE=/1280x960/d3ed/d3ed001efeac469097afcb8638e4ca76.jpg"
                      alt=""
                    />
                  </div>
                    
                    <div className="products-detail">
                      <h3>2014 Ford Fiesta</h3>
                    </div>
                    <div className="products-price">
                      <div className="products-left"><h3>$7,995</h3>
                      </div>
                    </div>
                    
                    <div className='meleage-city'>
                      <div className="mileage">
                        <div className="mileage-left">
                          <div className='mile-image'>
                            <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                          </div>
                          <h4>104,639 Miles</h4>
                        </div>
                      </div>
                      <div className="city">
                        <div className="city-right"><h4>Denver, CO</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </a> */}

                {/*<a href="CarInfo">
                <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/gyw91Dcw-tv_40yIYnZaRbXeyoE=/1280x960/effd/effd19594b1840999151aba1aadc103c.jpg"
                      alt="Product"
                    />
                  </div>
                    <div className="products-detail">
                    <h3>2016 Jeep Cherokee</h3>
                  </div>
                  <div className="products-price">
                    <div className="products-left"><h3>$13,995</h3>
                    </div>
                  </div>
                  
                  <div className='meleage-city'>
                    <div className="mileage">
                      <div className="mileage-left">
                        <div className='mile-image'>
                          <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                        </div>
                        <h4>93,699 Miles</h4>
                      </div>
                    </div>
                    <div className="city">
                      <div className="city-right"><h4>Denver, CO</h4>
                      </div>
                    </div>
                  </div>
                </div>
                </a>*/}

                 {/*<a href="CarInfo">
                <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/6UDntzf3f2A5XMHXBK2opFz4sjU=/1000x750/eb7f/eb7f2828aa1b4f8dab83e04bb2d0ddb8.jpg"
                      alt=""
                    />
                  </div>
                    <div className="products-detail">
                    <h3>2010 Hyundai Santa FE</h3>
                  </div>
                  <div className="products-price">
                    <div className="products-left"><h3>$4,899</h3>
                    </div>
                  </div>
                  
                  <div className='meleage-city'>
                    <div className="mileage">
                      <div className="mileage-left">
                        <div className='mile-image'>
                          <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                        </div>
                        <h4>200,000 Miles</h4>
                      </div>
                    </div>
                    <div className="city">
                      <div className="city-right"><h4>Denver, CO</h4>
                      </div>
                    </div>
                  </div>
                </div>
                </a>*/}

                 {/*<a href="CarInfo">
                <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/NJrez1SM7cFsEx9BJ4Vkj3FgA3U=/1000x750/9cd6/9cd6d6d78efd41dbbc7861956d731ac2.jpg"
                      alt=""
                    />
                  </div>
                    <div className="products-detail">
                    <h3>2010 Ford F-150</h3>
                  </div>
                  <div className="products-price">
                    <div className="products-left"><h3>$10,000</h3>
                    </div>
                  </div>
                  
                  <div className='meleage-city'>
                    <div className="mileage">
                      <div className="mileage-left">
                        <div className='mile-image'>
                          <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                        </div>
                        <h4>19,451 Miles</h4>
                      </div>
                    </div>
                    <div className="city">
                      <div className="city-right"><h4>Denver, CO</h4>
                      </div>
                    </div>
                  </div>
                </div>
                </a>*/}

                 {/*<a href="CarInfo">
                <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/WSKMgd1P9DeZOVqwbvL-oHbhVpc=/1000x750/3d62/3d62d9eb30bf414aacda95093ee12e5f.jpg"
                      alt="Product"
                    />
                  </div>
                    <div className="products-detail">
                    <h3>1983 Cadillac Eldorado</h3>
                  </div>
                  <div className="products-price">
                    <div className="products-left"><h3>$5,799</h3>
                    </div>
                  </div>
                  
                  <div className='meleage-city'>
                    <div className="mileage">
                      <div className="mileage-left">
                        <div className='mile-image'>
                          <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                        </div>
                        <h4>66,000 Miles</h4>
                      </div>
                    </div>
                    <div className="city">
                      <div className="city-right"><h4>Denver, CO</h4>
                      </div>
                    </div>
                  </div>
                </div>
                </a>*/}

                 {/*<a href="CarInfo">
                <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/RlVjLHMSWQv0yn5PpsQAOMMQnss=/2048x1536/d8ba/d8bafb71d2af4d568eab0bd7a19bec0f.jpg"
                      alt="Product"
                    />
                  </div>
                    <div className="products-detail">
                    <h3>2009 Chevrolet Malibu Hybrid</h3>
                  </div>
                  <div className="products-price">
                    <div className="products-left"><h3>$10,000</h3>
                    </div>
                  </div>
                  
                  <div className='meleage-city'>
                    <div className="mileage">
                      <div className="mileage-left">
                        <div className='mile-image'>
                          <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                        </div>
                        <h4>57,340 Miles</h4>
                      </div>
                    </div>
                    <div className="city">
                      <div className="city-right"><h4>Denver, CO</h4>
                      </div>
                    </div>
                  </div>
                </div>
                </a>*/}

                 {/*<a href="CarInfo">
              <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/WckpWTB8OihN7wEKqyq7wwcQkYs=/1152x864/597f/597f8cfe864c483faf1be7b5f3f0cedf.jpg"
                      alt=""
                    />
                  </div>
                  
                  <div className="products-detail">
                    <h3>2010 Chevrolet Malibu</h3>
                  </div>
                  <div className="products-price">
                    <div className="products-left"><h3>$4,600</h3>
                    </div>
                  </div>
                  
                  <div className='meleage-city'>
                    <div className="mileage">
                      <div className="mileage-left">
                        <div className='mile-image'>
                          <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                        </div>
                        <h4>164,000 Miles</h4>
                      </div>
                    </div>
                    <div className="city">
                      <div className="city-right"><h4>Denver, CO</h4>
                      </div>
                    </div>
                  </div>
                </div>
                </a>*/}

                 {/*<a href="CarInfo">
                <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/28n-ueyEb2RRxTyviHBYFHdH_YU=/1922x1442/4940/4940044bf8ef490aa0f1b57730e0e8ae.jpg"
                      alt="Product"
                    />
                  </div>
                    <div className="products-detail">
                    <h3>2000 Dodge Ram</h3>
                  </div>
                  <div className="products-price">
                    <div className="products-left"><h3>$15,000</h3>
                    </div>
                  </div>
                  
                  <div className='meleage-city'>
                    <div className="mileage">
                      <div className="mileage-left">
                        <div className='mile-image'>
                          <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                        </div>
                        <h4>299,393 Miles</h4>
                      </div>
                    </div>
                    <div className="city">
                      <div className="city-right"><h4>Denver, CO</h4>
                      </div>
                    </div>
                  </div>
                </div>
                </a>*/}

                 {/*<a href="CarInfo">
              <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/4uQVF_BU-_3APQkmUNUmGB3xqhE=/1280x960/d3ed/d3ed001efeac469097afcb8638e4ca76.jpg"
                      alt=""
                    />
                  </div>
                    
                    <div className="products-detail">
                      <h3>2014 Ford Fiesta</h3>
                    </div>
                    <div className="products-price">
                      <div className="products-left"><h3>$7,995</h3>
                      </div>
                    </div>
                    
                    <div className='meleage-city'>
                      <div className="mileage">
                        <div className="mileage-left">
                          <div className='mile-image'>
                            <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                          </div>
                          <h4>104,639 Miles</h4>
                        </div>
                      </div>
                      <div className="city">
                        <div className="city-right"><h4>Denver, CO</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>*/}

                 {/*<a href="CarInfo">
                <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/gyw91Dcw-tv_40yIYnZaRbXeyoE=/1280x960/effd/effd19594b1840999151aba1aadc103c.jpg"
                      alt="Product"
                    />
                  </div>
                    <div className="products-detail">
                    <h3>2016 Jeep Cherokee</h3>
                  </div>
                  <div className="products-price">
                    <div className="products-left"><h3>$13,995</h3>
                    </div>
                  </div>
                  
                  <div className='meleage-city'>
                    <div className="mileage">
                      <div className="mileage-left">
                        <div className='mile-image'>
                          <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                        </div>
                        <h4>93,699 Miles</h4>
                      </div>
                    </div>
                    <div className="city">
                      <div className="city-right"><h4>Denver, CO</h4>
                      </div>
                    </div>
                  </div>
                </div>
                </a>*/}

                 {/*<a href="CarInfo">
                <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/6UDntzf3f2A5XMHXBK2opFz4sjU=/1000x750/eb7f/eb7f2828aa1b4f8dab83e04bb2d0ddb8.jpg"
                      alt=""
                    />
                  </div>
                    <div className="products-detail">
                    <h3>2010 Hyundai Santa FE</h3>
                  </div>
                  <div className="products-price">
                    <div className="products-left"><h3>$4,899</h3>
                    </div>
                  </div>
                  
                  <div className='meleage-city'>
                    <div className="mileage">
                      <div className="mileage-left">
                        <div className='mile-image'>
                          <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                        </div>
                        <h4>200,000 Miles</h4>
                      </div>
                    </div>
                    <div className="city">
                      <div className="city-right"><h4>Denver, CO</h4>
                      </div>
                    </div>
                  </div>
                </div>
                </a>*/}

                 {/*<a href="CarInfo">
                <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/NJrez1SM7cFsEx9BJ4Vkj3FgA3U=/1000x750/9cd6/9cd6d6d78efd41dbbc7861956d731ac2.jpg"
                      alt=""
                    />
                  </div>
                    <div className="products-detail">
                    <h3>2010 Ford F-150</h3>
                  </div>
                  <div className="products-price">
                    <div className="products-left"><h3>$10,000</h3>
                    </div>
                  </div>
                  
                  <div className='meleage-city'>
                    <div className="mileage">
                      <div className="mileage-left">
                        <div className='mile-image'>
                          <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                        </div>
                        <h4>19,451 Miles</h4>
                      </div>
                    </div>
                    <div className="city">
                      <div className="city-right"><h4>Denver, CO</h4>
                      </div>
                    </div>
                  </div>
                </div>
                </a>*/}

                 {/*<a href="CarInfo">
                <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/WSKMgd1P9DeZOVqwbvL-oHbhVpc=/1000x750/3d62/3d62d9eb30bf414aacda95093ee12e5f.jpg"
                      alt="Product"
                    />
                  </div>
                    <div className="products-detail">
                    <h3>1983 Cadillac Eldorado</h3>
                  </div>
                  <div className="products-price">
                    <div className="products-left"><h3>$5,799</h3>
                    </div>
                  </div>
                  
                  <div className='meleage-city'>
                    <div className="mileage">
                      <div className="mileage-left">
                        <div className='mile-image'>
                          <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                        </div>
                        <h4>66,000 Miles</h4>
                      </div>
                    </div>
                    <div className="city">
                      <div className="city-right"><h4>Denver, CO</h4>
                      </div>
                    </div>
                  </div>
                </div>
                </a>*/}

                 {/*<a href="CarInfo">
                <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/RlVjLHMSWQv0yn5PpsQAOMMQnss=/2048x1536/d8ba/d8bafb71d2af4d568eab0bd7a19bec0f.jpg"
                      alt="Product"
                    />
                  </div>
                    <div className="products-detail">
                    <h3>2009 Chevrolet Malibu Hybrid</h3>
                  </div>
                  <div className="products-price">
                    <div className="products-left"><h3>$10,000</h3>
                    </div>
                  </div>
                  
                  <div className='meleage-city'>
                    <div className="mileage">
                      <div className="mileage-left">
                        <div className='mile-image'>
                          <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                        </div>
                        <h4>57,340 Miles</h4>
                      </div>
                    </div>
                    <div className="city">
                      <div className="city-right"><h4>Denver, CO</h4>
                      </div>
                    </div>
                  </div>
                </div>
                </a>*/}

                 {/*<a href="CarInfo">
              <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/WckpWTB8OihN7wEKqyq7wwcQkYs=/1152x864/597f/597f8cfe864c483faf1be7b5f3f0cedf.jpg"
                      alt=""
                    />
                  </div>
                  
                  <div className="products-detail">
                    <h3>2010 Chevrolet Malibu</h3>
                  </div>
                  <div className="products-price">
                    <div className="products-left"><h3>$4,600</h3>
                    </div>
                  </div>
                  
                  <div className='meleage-city'>
                    <div className="mileage">
                      <div className="mileage-left">
                        <div className='mile-image'>
                          <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                        </div>
                        <h4>164,000 Miles</h4>
                      </div>
                    </div>
                    <div className="city">
                      <div className="city-right"><h4>Denver, CO</h4>
                      </div>
                    </div>
                  </div>
                </div>
                </a>*/}

                {/*<a href="CarInfo">
                <div className="products-item">
                  <div className="products-img">
                    <img 
                      src="https://images.offerup.com/28n-ueyEb2RRxTyviHBYFHdH_YU=/1922x1442/4940/4940044bf8ef490aa0f1b57730e0e8ae.jpg"
                      alt="Product"
                    />
                  </div>
                    <div className="products-detail">
                    <h3>2000 Dodge Ram</h3>
                  </div>
                  <div className="products-price">
                    <div className="products-left"><h3>$15,000</h3>
                    </div>
                  </div>
                  
                  <div className='meleage-city'>
                    <div className="mileage">
                      <div className="mileage-left">
                        <div className='mile-image'>
                          <img src="https://icons.veryicon.com/png/o/business/menu-icon-of-sanitation-industry/operating-mileage.png" alt="Car Image" />
                        </div>
                        <h4>299,393 Miles</h4>
                      </div>
                    </div>
                    <div className="city">
                      <div className="city-right"><h4>Denver, CO</h4>
                      </div>
                    </div>
                  </div>
                </div>
                </a>*/}
                
                
            </div>
          </div>
        </div>
      </div>


      <div className="arrows">
        <span>Go to Next Page</span>
          <Link to="/HomeIndex" className="link-with-arrow">
            <BsFillArrowRightSquareFill />
          </Link>
        </div>

      <div className='footer'>
        <p>2023</p>
      </div>

    </section>
  );
};

export default HomeIndex;
