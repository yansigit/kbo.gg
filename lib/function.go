package lib

import (
	"encoding/json"
	"github.com/joho/godotenv"
	"github.com/kamva/mgm/v3"
	"go.mongodb.org/mongo-driver/mongo/options"
	"log"
	"math/rand"
	"os"
	"time"
)

func MongoConnect() {
	err := godotenv.Load("C:\\Users\\lnb\\WebstormProjects\\kbo.gg\\.env")
	if err != nil {
		panic("Error loading .env file")
	}

	err = mgm.SetDefaultConfig(nil, "KBOGG_GAME", options.Client().ApplyURI(os.Getenv("MONGO_URL")))
	if err != nil {
		log.Println(err)
		panic("몽고디비 연결에 문제가 있습니다")
	}
	rand.Seed(time.Now().UnixNano())
}

func MongoDisconnect() {
	_, client, _, err := mgm.DefaultConfigs()
	if err != nil {
		panic(err)
	}
	err = client.Disconnect(mgm.Ctx())
	if err != nil {
		panic("몽고DB 커넥션을 종료 하는데 문제가 있습니다")
	}
}

func ErrorAsJsonString(errorString string) string {
	jsonByte, err := json.Marshal(ErrorJson{Error: errorString})
	if err != nil {
		panic(err)
	}
	return string(jsonByte)
}
