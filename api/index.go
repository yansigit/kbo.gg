package handler

import (
	"fmt"
	"net/http"
)

func init() {

}

func INDEX(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "인덱스임당")
}
