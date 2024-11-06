import { Link } from 'react-router-dom';

const Tips = () => {
    return (
        <div className="tips">
            <div>
                <h1>
                    Tips for <span className="accent">Budgeting Wisely</span>
                </h1>

                <section className="tips-section" style={{ marginTop: '60px' }}>
                    <h2 style={{ marginBottom: '20px' }}>
                        Check Out Dining Plan Options to Save Your Budget
                    </h2>
                    <p style={{ marginBottom: '20px' }}>
                        Explore various <a href="https://www.bu.edu/dining/plans-points/" className="accent" >dining plans</a> that can help you save money while enjoying delicious meals.
                    </p>
                </section>

                <section className="calculator-section" style={{ marginTop: '60px' }}>
                    <h2>Nutrition Calculator</h2>
                    <p align = "center">
                        Use the following calculator to help track your nutritional intake:
                    </p>
                    <Link to="/nutritional" className="btn btn--dark">
                        <div className="calculator-code">
                            <div align = "center">
                            <img src="/src/assets/calculator.png" a/>
                            </div>
                        </div>
                    </Link>
                    <div align = "center">
                        <h3>Click Calculator</h3>
                    </div>
                </section>

                <section className="budget-section" style={{ marginTop: '60px' }}>
                    <h2 style={{ margin: '20px 0' }}>Tips for Terriers</h2>
                    <p style={{ margin: '20px 0' }}>
                        Keeping track of your money can be challenging, so here are a few tips from professionals and fellow terriers to keep you on track!
                    </p>
                    <ul style={{ fontSize: '14px', listStyleType: 'disc', paddingLeft: '20px' }}>
                        <li style={{ marginBottom: '15px' }}>
                            <strong>Calculate your net income!</strong> The only way to budget is to find out how much money you actually have to spend, so take some time to figure out your net income from jobs, financial aid, gifted money, etc.
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <strong>Record your everyday expenses:</strong> This has never been easier than with our BUdget site, as it organizes and helps visualize all your purchases. Just add your expenses and see how much money you have left to budget. Include online purchases, meals, sweet treats, and anything else you spent your pretty pennies on!
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <strong>Anticipate a category of “Random”:</strong> for purchases that don't fall under anything planned. We’re all human, and sometimes we do want to treat ourselves to that new purse or perhaps a Red Bull every once in a while.
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <strong>Practice comparison shopping!</strong> Look for better-priced items online, prioritize pricing over quality when you can, and be mindful of the purchases that you decide to splurge on. Do you really need those Gucci slippers, or will cheaper dupes be a wiser financial decision?
                        </li>
                        <li>
                            <strong>Make adjustments in your everyday life:</strong> If you think the life you’re living is too costly, find ways to lower your costs through cheaper groceries or less fancy outings. Sometimes it can be smaller expenses that are good to change, but sometimes it means moving into a cheaper dorm or using a dining plan rather than making your own meals.
                        </li>
                    </ul>
                </section>

                <Link to="/" className="btn btn--dark">
                    Return Home
                </Link>
            </div>
        </div>
    );
};

export default Tips;
