roll <- function(){
	die <- 1:6
	dice <- sample(die,size=2,replace=TRUE)
	sum(dice)
}
rolls <- replicate(100000,roll())
qplot(rolls,binwidth=0.5)