import { Link } from 'react-router-dom';
import { useState } from 'react';

const NutritionCalculator = () => {
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [activityLevel, setActivityLevel] = useState(1.2);
    const [result, setResult] = useState('');

    const calculateCalories = () => {
        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);
        const ageNum = parseFloat(age);
        let bmr;

        // Calculate BMR
        if (gender === 'male') {
            bmr = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum) + 5;
        } else {
            bmr = (10 * weightNum) + (6.25 * heightNum) - (5 * ageNum) - 161;
        }

        // Calculate TDEE
        const tdee = bmr * activityLevel;
        setResult(`Your estimated calorie intake is: ${Math.round(tdee)} calories/day.`);
    };

    return (
        <div className="nutrition-calculator">
            <h1>
                How many calories per day should you intake?
            </h1>

            <form id="calorieCalc">
                <label htmlFor="weight">Weight (kg):</label>
                <input
                    type="number"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    required
                /><br />

                <label htmlFor="height">Height (cm):</label>
                <input
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    required
                /><br />

                <label htmlFor="age">Age (years):</label>
                <input
                    type="number"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    required
                /><br />

                <label htmlFor="gender">Gender:</label>
                <select
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select><br />

                <label htmlFor="activity">Activity Level:</label>
                <select
                    id="activity"
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(parseFloat(e.target.value))}
                    required
                >
                    <option value={1.2}>Sedentary (little or no exercise)</option>
                    <option value={1.375}>Lightly active (light exercise/sports 1-3 days/week)</option>
                    <option value={1.55}>Moderately active (moderate exercise/sports 3-5 days/week)</option>
                    <option value={1.725}>Very active (hard exercise/sports 6-7 days a week)</option>
                    <option value={1.9}>Super active (very hard exercise, physical job, or training twice a day)</option>
                </select><br />

                <button type="button" onClick={calculateCalories} className="btn btn--dark" style={{ marginTop: '20px'}}>
                    Calculate Calories
                </button>
            </form>

            {result && (
                <div className="result" style={{ marginTop: '20px', fontWeight: 'bold' }}>
                    {result}
                </div>
            )}

            <Link to="/" className="btn btn--dark" style={{ marginTop: '20px'}}>
                Return Home
            </Link>
        </div>
    );
};

export default NutritionCalculator;
