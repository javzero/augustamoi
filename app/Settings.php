<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Settings extends Model
{
    protected $table = 'settings';

    protected $primaryKey = 'id';

    protected $fillable = ['user_id', 'email', 'notifications', 'phone1', 'whatsapp', 'reseller_money_min', 
                            'reseller_min', 'google_analytics', 'home_banners', 'home-filters' ];
}
