# Infinite Scroll Component

a view which will infinitely load pages of data

logic:
  - a div with an intersection observer to detect when it is on screen
  - when on screen, if the lastPage is not the same as previouslyFetchedPage increment the lastPage and fetchPageData()
  - 
