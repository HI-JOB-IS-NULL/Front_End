import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { kServerIP } from "../IP";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import styled from "styled-components";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
export default function MyMealPlan() {
  const accessToken = sessionStorage.getItem("ACCESS_TOKEN");
  const [mealPlanData, setMealPlanData] = useState();
  const [sendRequest, setSendRequest] = useState(false);
  const [bookmarkList, setBookmarkList] = useState([]);
  useEffect(() => {
    if (mealPlanData === undefined || sendRequest) {
      console.log("get meal plan");
      axios({
        method: "get",
        url: `${kServerIP}/MealPlan/getMealPlan`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(function (res) {
        console.log(res);
        setMealPlanData(res.data);
      });
      setSendRequest(false);
    }
  }, [sendRequest]);

  async function deletePlan(planId) {
    console.log("delete plan");
    try {
      await axios({
        method: "get",
        url: `${kServerIP}/MealPlan/removeMealPlan?planId=${planId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setSendRequest(true);
      console.log("set request true");
    } catch (err) {
      console.log(`ERROR: ${err}`);
    }
  }

  async function changeStatus(planListId) {
    console.log("change statue of plan");
    try {
      await axios({
        method: "get",
        url: `${kServerIP}/MealPlan/nser/ChangeStatus?planListId=${planListId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (accessToken) {
      axios({
        method: "post",
        url: `${kServerIP}/auth/recipeBookMarkList`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then(function (res) {
        console.log(res.data.BookMarkList);
        setBookmarkList(res.data.BookMarkList);
      });
    }
  }, []);

  const mealPlans = mealPlanData?.map((dayOfWeek, index) => {
    return (
      <Container key={index}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "auto", fontSize: "1.5rem" }}>
              Calories: {dayOfWeek.nutrients.calories}&nbsp;&nbsp;
              Carbohydrates:
              {dayOfWeek.nutrients.carbohydrates}&nbsp;&nbsp; Fat:
              {dayOfWeek.nutrients.fat}
              &nbsp;&nbsp; Protein: {dayOfWeek.nutrients.protein}
            </span>

            <Tippy content="Delete today Plan">
              <DeleteRoundedIcon
                fontSize="large"
                className="delete-icon"
                onClick={() => deletePlan(dayOfWeek.plan_id)}
              />
            </Tippy>
          </div>

          <div style={{ display: "flex", gap: "40px" }}>
            {dayOfWeek.meals.map((mealOfDay, index) => {
              return (
                <Card
                  key={index}
                  clear_state={mealOfDay.clear_state}
                  id={mealOfDay.recipeId}
                  title={mealOfDay.title}
                  changeStatus={changeStatus}
                  planListId={mealOfDay.id}
                  image={`https://spoonacular.com/recipeImages/${mealOfDay.recipeId}-480x360.${mealOfDay.imageType}`}
                  bookMark={
                    bookmarkList.includes(mealOfDay.recipeId.toString())
                      ? true
                      : false
                  }
                />
              );
            })}
          </div>
        </div>
      </Container>
    );
  });

  return (
    <div style={{ padding: "10px 10px" }}>
      {mealPlanData != undefined && !sendRequest && <div>{mealPlans}</div>}
    </div>
  );
}
const Container = styled.div`
  .delete-icon {
    cursor: pointer;
    &:hover {
      color: green;
    }
  }
`;
