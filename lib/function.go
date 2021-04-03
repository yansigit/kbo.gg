package lib

import (
	"github.com/kamva/mgm/v3"
	"log"
)

func MongoDisconnect() {
	_, client, _, err := mgm.DefaultConfigs()
	if err != nil {
		panic(err)
	}
	err = client.Disconnect(mgm.Ctx())
	if err != nil {
		log.Fatal("몽고DB 커넥션을 종료 하는데 문제가 있습니다")
	}
}
