import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Carousel from '../components/Carousel';

function Home() {
    const [foodCat, setFoodCat] = useState([]);  // Food categories
    const [foodItem, setFoodItem] = useState([]);  // Food items

    const loadData = async () => {
        try {
            let response = await fetch("http://localhost:5001/api/food_data", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Data received:", data);  // Debugging

            if (data && data.sample && data.foodCategory) {
                setFoodItem(data.sample || []);  // ✅ Store food items
                setFoodCat(data.foodCategory || []);   // ✅ Store categories
            } else {
                console.error("Invalid response structure:", data);
                setFoodItem([]);
                setFoodCat([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setFoodItem([]);
            setFoodCat([]);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div>
            <Navbar />
            <Carousel />
            <div className='container'>
                {foodCat.length > 0 ? (
                    foodCat.map((category, index) => {
                        const categoryName = category?.CategoryName?.toLowerCase() || ""; // ✅ Fixed case mismatch
                        console.log(`Filtering items for category: ${categoryName}`);

                        const filteredItems = foodItem.filter(
                            (item) => (item?.Categoryname?.toLowerCase() || "") === categoryName
                        );

                        return (
                            <div key={index}>
                                <h2 className='my-3'>{category.CategoryName}</h2>
                                <hr />
                                <div className="row">
                                    {filteredItems.length > 0 ? (
                                        filteredItems.map((filteredItem, itemIndex) => (
                                            <div key={itemIndex} className="col-md-4 mb-4">
                                                <Card
                                                    foodItem = {filteredItem}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-center">No items found for this category.</p>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center">Loading categories...</p>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Home;
