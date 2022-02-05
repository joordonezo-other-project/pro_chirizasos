@extends('layouts.app')

@section('content')
    <div class="container">
        <input type="hidden" id="_token" name="_token" value="{{ csrf_token() }}">
        <div class="row justify-content-center">
            <div class="col-lg-12 col-md-12 col-xs-12 col-sm-12">

                @include('home.navbar')

                @include('home.panels')
            </div>
        </div>
    </div>
@endsection
