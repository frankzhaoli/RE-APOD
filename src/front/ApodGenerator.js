import React, {Component} from 'react';

export class ApodGenerator extends Component
{
    constructor()
    {
        super();

        //get current date
        let now=new Date();
        
        //month is 0 index
        let month=now.getMonth()+1;
        let day=now.getDate();
        let year=now.getFullYear();

        this.state=
        {
            data:{},
            month:month,
            day:day,
            year:year
        };

        this.handleClickPrevDay=this.handleClickPrevDay.bind(this);
        this.handleClickNextDay=this.handleClickNextDay.bind(this);
        this.handleClickToday=this.handleClickToday.bind(this);
    }

    componentDidMount()
    {
        fetch("https://api.nasa.gov/planetary/apod?api_key=9rAxvRPLrCgaSk8B2B6fcRVT66aCAuagDBkCec11")
        .then(response=>response.json())
        .then(data=> {        
            this.setState({
                data:data
            });
        })
    }

    handleClickPrevDay()
    {   
        let apiURL="https://api.nasa.gov/planetary/apod?api_key=9rAxvRPLrCgaSk8B2B6fcRVT66aCAuagDBkCec11&date="+this.state.year+"-"+this.state.month+"-"+(this.state.day-1);
        
        fetch(apiURL)
        .then(response=>response.json())
        .then(data=> {
            //console.log(data);
            this.setState({
                data:data,
            });
        })

        console.log(this.state.day);
        let setDay=30;
        let yearDecrement=0;
        let monthDecrement=0;

        this.setState(prevState=>{
            if(prevState.day>=2)
            {
                return{
                    day:prevState.day-1
                }
            }
            else
            {
                console.log("month decrement and day reset!");
                
                if(prevState.month-1===1 || prevState.month-1===3 || prevState.month-1===5 || prevState.month-1===7 || prevState.month-1===8 || prevState.month-1===10 || prevState.month-1===12)
                {
                    setDay=31
                }
                else if (prevState.month-1==2)
                {
                    setDay=28
                }
                else
                {
                    setDay=30
                }

                if(prevState.month<=1)
                {
                    console.log("year decrement, month reset");
                    yearDecrement++;

                    return{
                        day:prevState.day=setDay,
                        month:prevState.month=12,
                        year:prevState.year-yearDecrement
                    }
                }

                return{
                    day:prevState.day=setDay,
                    month:prevState.month-1,
                    year:prevState.year-yearDecrement
                }
            }
        });
        
    }

    handleClickToday()
    {
        //get current date
        let now=new Date();
        let month=now.getMonth()+1;
        let day=now.getDate();
        let year=now.getFullYear();

        console.log("Moving to today's apod.");
        
        let apiURL="https://api.nasa.gov/planetary/apod?api_key=9rAxvRPLrCgaSk8B2B6fcRVT66aCAuagDBkCec11&date="+year+"-"+month+"-"+day;
        
        fetch(apiURL)
        .then(response=>response.json())
        .then(data=> {
            this.setState({
                data:data,
            });
        })

        this.setState(prevState => {
            return{
                day:prevState.day=day,
                month:prevState.month=month,
                year:prevState.year=year
            }
        })
    }

    handleClickNextDay()
    {
        let now=new Date();

        //console.log(this.state.day+" "+this.state.month+" "+this.state.year);
        //console.log(now.getDate()+" "+now.getMonth()+" "+now.getFullYear());

        if(this.state.day===now.getDate() && this.state.month===(now.getMonth()+1) && this.state.year===now.getFullYear())
        {
            console.log("Cannot go past today's date!");
            alert("Cannot go past today's date!");
            return;
        }
        
        let apiURL="https://api.nasa.gov/planetary/apod?api_key=9rAxvRPLrCgaSk8B2B6fcRVT66aCAuagDBkCec11&date="+this.state.year+"-"+this.state.month+"-"+(this.state.day+1);
        
        fetch(apiURL)
        .then(response=>response.json())
        .then(data=> {
            this.setState({
                data:data,
            });
        })

        this.setState(prevState=>{
            return{
                    day:prevState.day+1
            }
        });
    }

    render()
    {
        return(
            <div>
                <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "10vh"}}>
                <button style={{margin:5}} onClick={this.handleClickPrevDay} type="button" className="btn">Previous Day</button>
                <button style={{margin:5}} onClick={this.handleClickToday} type="button" className="btn">Today's APOD</button>
                <button style={{margin:5}} onClick={this.handleClickNextDay} type="button" className="btn">Next Day</button>
                </div> 
                <div className="apod">
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <img style={{height:"10%", width:900}} class="img-rounded" src={this.state.data.hdurl} alt="apod"/>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "7vh"}}>
                        <h2>{this.state.data.title+", "+this.state.data.date}</h2>
                    </div>
                    <div style={{margin:15}}>
                        <p>{this.state.data.explanation}</p>
                    </div>
                </div>
            </div>
        );
    }
}