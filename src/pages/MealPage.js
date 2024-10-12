import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import { CircleChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchMealFoods, getMealData } from "../services/DietsService";  // Import the fetch function
import { ptBR } from "date-fns/locale";

const MealPage = () => {
    const navigate = useNavigate();
    const { mealId } = useParams();  // Fetch mealId from route params
    const [meal, setMeal] = useState({ name: "", date: "", foods: [] });  // Meal data with foods

    // Fetch meal data on component mount or when mealId changes
    useEffect(() => {
        const initPage = async () => {
            try {
                const mealData = await fetchMealFoods(mealId);  // Fetch meal data from the service
                setMeal(mealData);  // Set the fetched meal data to state
            } catch (error) {
                console.error("Failed to fetch meal data", error);
            }
        };
        initPage();
    }, [mealId]);

    return (
        <MainLayout>
            <section className="relative flex flex-col">
                <div className="flex items-center gap-4">
                    <button className="px-0 offset-0 my-0 py-0" onClick={() => navigate("/home")}>
                        <CircleChevronLeft className="text-blue-500" />
                    </button>
                    <h2 className="text-slate-800 font-bold text-3xl mb-0.5 flex items-center gap-4">
                        {/* Display meal name and date */}
                        <span>{meal.name} de Hoje</span>
                    </h2>
                </div>

                {/* Render the list of foods in the meal */}
                <div className="mt-6">
                    <h3 className="text-xl font-bold mb-4">Alimentos</h3>
                    {meal.foods.length > 0 ? (
                        <ul>
                            {meal.foods.map((mealFood, index) => (
                                <li
                                    key={index}
                                    className="border-b py-2 flex flex-col"
                                >
                                    <span className="font-semibold text-lg">{mealFood.food.name}</span>
                                    <span>Porções: {mealFood.servings}</span>
                                    <span>Calorias: {mealFood.food.calories}</span>
                                    <span>Proteínas: {mealFood.food.protein}g</span>
                                    <span>Carboidratos: {mealFood.food.carbs}g</span>
                                    <span>Gorduras: {mealFood.food.fat}g</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Sem alimentos registrados para esta refeição.</p>
                    )}
                </div>
            </section>
        </MainLayout>
    );
};

export default MealPage;
