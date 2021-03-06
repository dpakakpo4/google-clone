import React from "react"
import "./SearchPage.css"
import { useStateValue } from "./../StateProvider"
import useGoogleSearch from "../useGoogleSearch"
import Response from "./../response"
import Search from "./../component/Search"
import { Link } from "react-router-dom"
import SearchIcon from "@material-ui/icons/Search"
import DescriptionIcon from "@material-ui/icons/Description"
import LocalOfferIcon from "@material-ui/icons/LocalOffer"
import RoomIcon from "@material-ui/icons/Room"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import ImageIcon from "@material-ui/icons/Image"

function SearchPage() {
    const [{ term='tesla' }, dispatch] = useStateValue()
    const {data} = useGoogleSearch(term)

    // const data = Response

    console.log(data)
    return (
        <div className="searchPage">
            <div className="searchPage__header">
                <Link to="/">
                    <img
                        className="searchPage__logo"
                        src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
                        alt=""
                    />
                </Link>

                <div className="searchPage__headerBody">
                    <Search  hideButtons />

                    <div className="searchPage__options">
                        <div className="searchPage_optionsLeft">
                            <div className="searchPage__option">
                                <SearchIcon />
                                <Link to="/all">All</Link>

                                <DescriptionIcon />
                                <Link to="/news">News</Link>


                                <ImageIcon />
                                <Link to="/images">Images</Link>


                                <LocalOfferIcon />
                                <Link to="/shopping">shopping</Link>


                                <RoomIcon />
                                <Link to="/maps">maps</Link>


                                <MoreVertIcon />
                                <Link to="/more">more</Link>
                            </div>
                        </div>

                        <div className="searchPage__optionsRight">
                            <div className="searchPage__option">
                                <Link to="/settings">Settings</Link>
                                <Link to="/tools">Tools</Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            {
                true&&(
                    <div className="searchPage__results">
                        <p className="searchPage__resultCount">
                            About {data?.searchInformation.formattedTotalResults} results ({data?.searchInformation.formattedSearchTime} seconds) for {term}
                        </p>

                        {data?.items.map(item=>(
                            <div className="searchPage__result">
                                <a href={item.link}>
                                    {item.pagemap?.cse_image?.length>0&&
                                    item.pagemap?.cse_image[0]?.src&&(
                                        <img className="searchPage__resultImage"
                                    src={item.pagemap?.cse_image[0]?.src} alt="" />
                                    )}
                                    {item.displayLink} ▽
                                </a>
                                <a href={item.link}
                                 className="searchPage__resultTitle">
                                    
                                    <h2>{item.title}</h2>
                                </a>
                                <p className='searchPage__resultSnippet'>
                                    {item.snippet}
                                </p>

                            </div>
                        ))}
                    </div>

                )
            }
        </div>
    )
}

export default SearchPage
