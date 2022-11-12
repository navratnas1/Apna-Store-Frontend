import React, { useEffect } from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategory } from '../../actions';
import { Link } from 'react-router-dom';

function MenuHeader() {
    const category = useSelector(state => state.category);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCategory());
    }, [])

    const renderCategories = (categories) => {
        let cats = [];
        for (let cat of categories) {
            cats.push(
                <li key={cat.name}>
                    {
                        cat.parentId ? (<a href={`/${cat.slug}?cid=${cat._id}&type=${cat.type}`}>{cat.name}</a>) :
                            (<span>{cat.name}</span>)
                    }
                    {cat.children.length > 0 && (<ul>{renderCategories(cat.children)}</ul>)}
                </li>
            )
        }
        return cats;
    }
    return (
        <div className='menuHeader'>
            <ul>
                {
                    category.categories.length > 0 ? renderCategories(category.categories) : null
                }
            </ul>
        </div>
    )
}

export default MenuHeader
