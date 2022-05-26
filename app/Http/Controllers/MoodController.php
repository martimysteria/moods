<?php

namespace App\Http\Controllers;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

class MoodController extends Controller
{   
    protected $mood;
    protected $moods=[];

    public function __construct(Request $request){
        $this->mood = json_decode($request->getContent());
        $this->moods = Cache::get('moods');
        
    }
    public function index(){

        $moodss = [];
        $t = Array();
        if($this->moods){
            $t = array_values($this->moods);
            foreach($t as $r){
            $moodss[] = array_values($r)[0]; 
            }
        }
      
        return response(json_encode($moodss),200)->header('Content-Type', 'JSON');
    }
    public function create(){
        
        $date = new DateTime();
        $dateKey = $date->format("Y-m-d");
        //if there is already moods entered 
        if($this->moods){
        array_push($this->moods,[$dateKey => $this->mood]);
        Cache::put('moods',$this->moods);
        }
        //init if empty
        else{
            $this->moods[] = [$dateKey => $this->mood];
            Cache::put('moods',$this->moods);
        }

        return response(json_encode($this->mood),200)->header('Content-Type', 'JSON');   
    }
    public function update(){
        $date = new DateTime();
        $dateKey = $date->format("Y-m-d");

        if(count($this->moods)){
            for($k=0;$k<count($this->moods);$k++){
                if($this->moods[$k][$dateKey]->id == $this->mood->id){
                    $this->moods[$k][$dateKey]->description = $this->mood->description;
                    $this->moods[$k][$dateKey]->user = $this->mood->user;
                    $this->moods[$k][$dateKey]->mood = $this->mood->mood;
                
                }
            
            }
        }
            Cache::put('moods',$this->moods);    
            return response(json_encode($this->mood),200)->header('Content-Type', 'JSON');   
    }
    public function reset(){
        Cache::forget('moods');
        Cache::put("moods",Array());
    }
}
