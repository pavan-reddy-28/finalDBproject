import React from 'react'
import { Card, Item, MainNav, SubCardContainer, Title } from '../styles/styles'

function AdminDashboard() {
  return (
    <div>
      <MainNav>
        {
          ["Add Professors","Add Deparments","View Professors","View Enrolled Students","Assign Classes","Update Assigned Classes"].map((obj,index) => (
            <Card key={`card-${index}`}>
              <SubCardContainer  key={`SubCardContainer-${index}`}>
                <Title  key={`title-${index}`} >
                  {obj}
                </Title>
              </SubCardContainer>
            </Card>
          ))
        }


      </MainNav>
    </div>
  )
}

export default AdminDashboard