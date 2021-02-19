import React, {Component} from 'react'

class SearchField extends Component {
    state = {
        food: []
    }
    

    getRecipes = async (e) => {
        e.preventDefault();
        
        
        let search_value = document.getElementById('search_field').value;
        search_value = search_value.toLowerCase();

        try{
            const myKey = "apiKey=3e8277975b66429f8265cafa0b992076"
        await fetch(`https://api.spoonacular.com/recipes/complexSearch?${myKey}&query=${search_value}&addRecipeInformation=true`) 
        .then((res) => res.json())
        .then(
            data => {
                this.setState({
                    food: data.results
                });
                if(data.results.length === 0){
                    window.alert("Please check your spelling or there isn't any recipes.")
                }
            })
        } catch(err){
            console.log(err)
        }
        console.log(this.state.food)
    }

    render(){
        return(
            <div>
                <form className="example" action="/action_page.php" onSubmit={this.getRecipes}>
                    <input type="text" placeholder="Search.." name="search2" id="search_field"/>
                    <button type="submit"><i className="fa fa-search"></i></button>
                </form>

                {this.state.food && this.state.food.map((recipe) => {
                    return (
                        <div>
                            <h2>{recipe.title}</h2>
                            <img src={recipe.image} />
                            {recipe.analyzedInstructions && recipe.analyzedInstructions.map((step)=>{
                                return(
                                    <>{step.steps && step.steps.map((actualCancer) => {
                                        return (
                                        <ul>
                                            <li>{actualCancer.step}</li>
                                        </ul>
                                        )
                                    })}</>
                                )
                            })}
                            
                        </div>
                    )
                })}

            </div>
        )
    }
}

export default SearchField;